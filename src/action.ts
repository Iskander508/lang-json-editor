import { cloneDeep } from "lodash";
import { JsonData, NodeType, TObjectNode } from "./protocol";
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

export function importJson(
  node: TObjectNode,
  data: JsonData,
  language: string,
  traversed?: boolean
): TObjectNode {
  const result = traversed ? node : cloneDeep(node);

  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (key.includes(".")) {
      const splitPosition = key.indexOf(".");
      const name = key.substring(0, splitPosition);
      const rest = key.substring(splitPosition + 1);
      const id = result.id ? `${result.id}.${name}` : name;
      let node = result.children.find(({ id: nodeId }) => nodeId === id);
      if (node?.type === NodeType.VALUE) {
        throw new Error(
          `Mismatch types: ${id}: current=${node.type}, imported=${NodeType.OBJECT}`
        );
      }
      if (!node) {
        node = {
          id,
          name,
          type: NodeType.OBJECT,
          children: [],
        };
        result.children.push(node);
      }
      importJson(node, { [rest]: value }, language, true);
      return;
    }

    const type = typeof value === "string" ? NodeType.VALUE : NodeType.OBJECT;
    const current = result.children.find(({ name }) => name === key);

    if (type === NodeType.OBJECT && !value) return;
    if (current && current.type !== type) {
      throw new Error(
        `Mismatch types: ${current.id}: current=${current.type}, imported=${type}`
      );
    }

    if (current) {
      if (current.type === NodeType.VALUE) {
        current.values[language] = value as string;
      } else {
        importJson(current, value as JsonData, language, true);
      }
    } else {
      const id = result.id ? `${result.id}.${key}` : key;
      if (type === NodeType.VALUE) {
        const values: Record<string, string> = {};
        const { languages } = getUrlParams();
        languages.forEach((l) => {
          values[l] = id;
        });
        values[language] = value as string;
        result.children.push({ id, name: key, type, values });
      } else {
        const newNode: TObjectNode = { id, name: key, type, children: [] };
        importJson(newNode, value as JsonData, language, true);
        result.children.push(newNode);
      }
    }
  });

  return result;
}

export function exportJson(node: TObjectNode, language: string): JsonData {
  const result: JsonData = {};

  node.children.forEach((item) => {
    if (item.type === NodeType.VALUE) {
      if (language in item.values) {
        result[item.name] = item.values[language];
      }
    } else {
      result[item.name] = exportJson(item, language);
    }
  });

  return result;
}
