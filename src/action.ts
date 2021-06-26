import { cloneDeep } from "lodash";
import { NodeType, TObjectNode } from "./protocol";
import { getUrlParams } from "./tree/util";

export function add(
  node: TObjectNode,
  id: string,
  type: NodeType,
  label: string,
  parentId?: string
): TObjectNode {
  const result = parentId ? node : cloneDeep(node);
  if (!id) {
    const item = {
      id: parentId ? `${parentId}.${label}` : label,
      name: label,
    };

    const values: Record<string, string> = {};
    if (type === NodeType.VALUE) {
      const { languages } = getUrlParams();
      languages.forEach((l) => {
        values[l] = item.id;
      });
    }

    result.children.push(
      type === NodeType.OBJECT
        ? { ...item, type, children: [] }
        : { ...item, type, values }
    );

    return result;
  }

  const [first, ...parts] = id.split(".");
  const child = result.children.find(({ name }) => name === first);
  if (child?.type === NodeType.OBJECT) {
    add(
      child,
      parts.join("."),
      type,
      label,
      parentId ? `${parentId}.${first}` : first
    );
    return result;
  }

  console.error("ADD: Invalid ID", id, type, node);
  return result;
}

export function changeValue(
  node: TObjectNode,
  id: string,
  language: string,
  value: string,
  traversed?: boolean
): TObjectNode {
  const result = traversed ? node : cloneDeep(node);

  const [first, ...parts] = id.split(".");
  const child = result.children.find(({ name }) => name === first);
  if (!child) {
    console.error("CHANGE-VALUE: Invalid ID", id, node);
    return result;
  }

  if (child.type === NodeType.OBJECT) {
    changeValue(child, parts.join("."), language, value, true);
  } else {
    child.values[language] = value;
  }

  return result;
}

export function remove(
  node: TObjectNode,
  id: string,
  traversed?: boolean
): TObjectNode {
  const result = traversed ? node : cloneDeep(node);

  const [first, ...parts] = id.split(".");
  const child = result.children.find(({ name }) => name === first);
  if (!child) {
    console.error("REMOVE: ID not found", id, node);
    return result;
  }

  if (parts.length) {
    if (child.type !== NodeType.OBJECT) {
      console.error("REMOVE: Invalid type", id, node);
      return result;
    }

    remove(child, parts.join("."), true);
  } else {
    result.children = result.children.filter(({ name }) => name !== first);
  }

  return result;
}
