import { useEffect, useState } from "react";
import { NodeType, Action } from "../protocol";
import { TreeContext } from "./Context";
import { ObjectNode } from "./ObjectNode";

function findMissing(node, languages, report) {
  switch (node.type) {
    case NodeType.VALUE:
      if (
        languages.some(
          (l) => node.values[l] === undefined || node.values[l] === null
        )
      ) {
        report(node.id);
      }
      break;
    case NodeType.OBJECT:
      node.children.forEach((n) => findMissing(n, languages, report));
      break;
    default:
      throw new Error(`Invalid type: ${node.type}`);
  }
}

export default function Tree({ data, onSendMessage }) {
  const [root, setRoot] = useState(data);
  useEffect(() => {
    setRoot(data);
  }, [data]);

  const [missingTranslations, setMissingTranslations] = useState([]);
  useEffect(() => {
    if (root?.languages?.length) {
      const missing = [];
      findMissing(root.content, root.languages, (id) => {
        missing.push(id);
      });
      setMissingTranslations(missing);
    }
  }, [root]);

  return (
    <TreeContext.Provider
      value={{
        missingTranslations,
        languages: root?.languages,
        onAdd: (id, type, label) => onSendMessage(Action.add(id, type, label)),
        onChangeValue: (id, language, value) =>
          onSendMessage(Action.changeValue(id, language, value)),
        onRemove: (id) => onSendMessage(Action.remove(id)),
      }}
    >
      {root ? <ObjectNode node={root.content} /> : null}
    </TreeContext.Provider>
  );
}
