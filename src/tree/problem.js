import { NodeType } from "../protocol";
import { isEqual } from "lodash";

export const Problem = {
  MISSING: "MISSING", // completely missing
  EMPTY: "EMPTY", // only whitespaces, or empty section
  SAME: "SAME", // same entry for multiple languages
  PLACEHOLDER_MISMATCH: "PLACEHOLDER_MISMATCH", // same entry for multiple languages
};

export function extractPlaceholders(value) {
  const matches = value.match(/{{\w+}}/g);
  if (!matches) return [];

  return Array.from(
    new Set(matches.map((p) => p.substring(2, p.length - 2)))
  ).sort();
}

function findProblemsTraverse(node, languages, report) {
  switch (node.type) {
    case NodeType.VALUE:
      if (
        languages.some(
          (l) => node.values[l] === undefined || node.values[l] === null
        )
      ) {
        return report(node.id, Problem.MISSING);
      }

      if (languages.some((l) => !node.values[l].trim())) {
        return report(node.id, Problem.EMPTY);
      }

      if (
        Object.values(node.values)
          .sort()
          .some((v, index, sorted) => index && v === sorted[index - 1])
      ) {
        return report(node.id, Problem.SAME);
      }

      if (
        Object.values(node.values)
          .map(extractPlaceholders)
          .some(
            (placeholders, index, all) =>
              index && !isEqual(placeholders, all[index - 1])
          )
      ) {
        return report(node.id, Problem.PLACEHOLDER_MISMATCH);
      }

      break;
    case NodeType.OBJECT:
      if (!node.children.length) {
        return report(node.id, Problem.EMPTY);
      }
      node.children.forEach((n) => findProblemsTraverse(n, languages, report));
      break;
    default:
      throw new Error(`Invalid type: ${node.type}`);
  }
}

export function findProblems(node, languages) {
  const problems = [];
  findProblemsTraverse(node, languages, (id, problem) => {
    problems.push({ id, problem });
  });
  return problems;
}
