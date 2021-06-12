import { TSourceMatch } from "./components/SourceMatch";
import { MatchType, NodeType } from "../protocol";
import { isEqual } from "lodash";
import { TNode } from "./util";

export const NO_PROBLEM = "NO_PROBLEM";
export enum Problem {
  MISSING = "MISSING", // completely missing
  EMPTY = "EMPTY", // only whitespaces, or empty section
  DEFAULT = "DEFAULT", // default label used
  SAME = "SAME", // same entry for multiple languages
  PLACEHOLDER_MISMATCH = "PLACEHOLDER_MISMATCH", // placeholders don't match between languages
  NO_MATCH_IN_SOURCES = "NO_MATCH_IN_SOURCES", // not found in any source file
  PARTIAL_MATCH_IN_SOURCES = "PARTIAL_MATCH_IN_SOURCES", // only parent node found in source files
}

export function extractPlaceholders(value?: string) {
  const matches = value?.match(/{{\w+}}/g);
  if (!matches) return [];

  return Array.from(
    new Set(matches.map((p) => p.substring(2, p.length - 2)))
  ).sort();
}

function findProblemsTraverse(
  node: TNode,
  languages: string[],
  sourceMatches: TSourceMatch[] | undefined,
  report: (id: string, problem: Problem) => void
) {
  switch (node.type) {
    case NodeType.VALUE:
      {
        node.exactSourceMatches =
          sourceMatches?.filter(
            ({ id, type }) => id === node.id && type === MatchType.EXACT
          ) || [];
        node.partialSourceMatches =
          sourceMatches?.filter(
            ({ id }) =>
              node.id.startsWith(`${id}.`) || node.id.startsWith(`${id}_plural`)
          ) || [];

        if (
          languages.some(
            (l) => node.values[l] === undefined || node.values[l] === null
          )
        ) {
          report(node.id, Problem.MISSING);
        } else if (languages.some((l) => !node.values[l].trim())) {
          report(node.id, Problem.EMPTY);
        }

        const foundSourceMatch = node.exactSourceMatches.length;
        const foundPartialSourceMatch = node.partialSourceMatches.length;
        if (!foundSourceMatch) {
          if (foundPartialSourceMatch) {
            report(node.id, Problem.PARTIAL_MATCH_IN_SOURCES);
          } else {
            report(node.id, Problem.NO_MATCH_IN_SOURCES);
          }
        }

        if (
          Object.values(node.values)
            .sort()
            .some((v, index, sorted) => index && v === sorted[index - 1])
        ) {
          report(node.id, Problem.SAME);
        }

        if (languages.some((l) => node.values[l] === node.id)) {
          report(node.id, Problem.DEFAULT);
        }

        if (
          Object.values(node.values)
            .map(extractPlaceholders)
            .some(
              (placeholders, index, all) =>
                index && !isEqual(placeholders, all[index - 1])
            )
        ) {
          report(node.id, Problem.PLACEHOLDER_MISMATCH);
        }
      }
      break;
    case NodeType.OBJECT:
      if (!node.children.length) {
        return report(node.id, Problem.EMPTY);
      }
      node.children.forEach((n) =>
        findProblemsTraverse(n, languages, sourceMatches, report)
      );
      break;
    default:
      throw new Error(`Invalid type: ${node.type}`);
  }
}

export type TFindProblemsResult = Array<{ id: string; problem: Problem }>;
export function findProblems(
  node: TNode,
  languages: string[],
  sourceMatches?: TSourceMatch[]
) {
  const problems: TFindProblemsResult = [];
  findProblemsTraverse(
    node,
    languages,
    sourceMatches,
    (id: string, problem: Problem) => {
      if (!sourceMatches && problem === Problem.NO_MATCH_IN_SOURCES) return;
      problems.push({ id, problem });
    }
  );
  return problems;
}
