import { useEffect, useState } from "react";
import { Action } from "../protocol";
import { findProblems } from "./problem";
import { TreeContext } from "./Context";
import { ObjectNode } from "./ObjectNode";

export default function Tree({ data, onSendMessage }) {
  const [root, setRoot] = useState(data);
  useEffect(() => {
    setRoot(data);
  }, [data]);

  const [problematicTranslations, setProblematicTranslations] = useState([]);
  useEffect(() => {
    if (root?.languages?.length) {
      setProblematicTranslations(findProblems(root.content, root.languages));
    }
  }, [root]);

  return (
    <TreeContext.Provider
      value={{
        problematicTranslations,
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
