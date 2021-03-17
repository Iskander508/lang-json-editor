import { NodeType } from "../protocol";

export const Problem = {
  MISSING: "MISSING", // completely missing
  EMPTY: "EMPTY", // only whitespaces, or empty section
  SAME: "SAME", // same entry for multiple languages
};

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
