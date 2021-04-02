import { NodeType } from "../protocol";

function findFilteredIDsTraverse(node, filter, caseSensitive, report) {
  function isMatch(id) {
    return caseSensitive
      ? id.includes(filter)
      : id.toLowerCase().includes(filter.toLowerCase());
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

export function findFilteredIDs(node, filter, caseSensitive) {
  const ids = [];
  findFilteredIDsTraverse(node, filter, caseSensitive, (id) => {
    ids.push(id);
  });
  return ids;
}
