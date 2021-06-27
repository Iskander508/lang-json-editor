import { NodeType, TNode } from "../protocol";
import { isEqual } from "lodash";

export const NO_PROBLEM = "NO_PROBLEM";
export enum Problem {
  MISSING = "MISSING", // completely missing
  EMPTY = "EMPTY", // only whitespaces, or empty section
  DEFAULT = "DEFAULT", // default label used
  SAME = "SAME", // same entry for multiple languages
  PLACEHOLDER_MISMATCH = "PLACEHOLDER_MISMATCH", // placeholders don't match between languages
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
  report: (id: string, problem: Problem) => void
) {
  switch (node.type) {
    case NodeType.VALUE:
      if (
        languages.some(
          (l) => node.values[l] === undefined || node.values[l] === null
        )
      ) {
        report(node.id, Problem.MISSING);
      } else if (languages.some((l) => !node.values[l].trim())) {
        report(node.id, Problem.EMPTY);
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

      break;
    case NodeType.OBJECT:
      if (!node.children.length) {
        return report(node.id, Problem.EMPTY);
      }
      node.children.forEach((n) => findProblemsTraverse(n, languages, report));
      break;
  }
}

export type TFindProblemsResult = Array<{ id: string; problem: Problem }>;
export function findProblems(node: TNode, languages: string[]) {
  const problems: TFindProblemsResult = [];
  findProblemsTraverse(node, languages, (id: string, problem: Problem) => {
    problems.push({ id, problem });
  });
  return problems;
}
