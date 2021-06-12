import { TNode } from "./util";
import { NodeType } from "../protocol";

function findFilteredIDsTraverse(
  node: TNode,
  filter: string,
  caseSensitive: boolean,
  report: (id: string) => void
) {
  function isMatch(id?: string) {
    return caseSensitive
      ? id?.includes(filter)
      : id?.toLowerCase().includes(filter.toLowerCase());
  }

  switch (node.type) {
    case NodeType.VALUE:
      if (isMatch(node.id) || Object.values(node.values).some(isMatch)) {
        report(node.id);
      }
      break;
    case NodeType.OBJECT:
      if (!node.children.length && isMatch(node.id)) {
        report(node.id);
      }
      node.children.forEach((n) =>
        findFilteredIDsTraverse(n, filter, caseSensitive, report)
      );
      break;
    default:
      throw new Error(`Invalid type: ${node.type}`);
  }
}

export function findFilteredIDs(
  node: TNode,
  filter: string,
  caseSensitive: boolean
) {
  const ids: string[] = [];
  findFilteredIDsTraverse(node, filter, caseSensitive, (id) => {
    ids.push(id);
  });
  return ids;
}

function findIDsTraverse(node: TNode, report: (id: string) => void) {
  switch (node.type) {
    case NodeType.VALUE:
      report(node.id);
      break;
    case NodeType.OBJECT:
      if (!node.children.length) {
        report(node.id);
      }
      node.children.forEach((n) => findIDsTraverse(n, report));
      break;
    default:
      throw new Error(`Invalid type: ${node.type}`);
  }
}

export function findIDs(node: TNode) {
  const ids: string[] = [];
  findIDsTraverse(node, (id) => {
    ids.push(id);
  });
  return ids;
}
