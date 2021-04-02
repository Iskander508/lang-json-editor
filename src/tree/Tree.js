import { useEffect, useState } from "react";
import { Action } from "../protocol";
import { findProblems } from "./problem";
import { findFilteredIDs } from "./filter";
import { TreeContext } from "./Context";
import { ObjectNode } from "./ObjectNode";

export default function Tree({
  data,
  matches,
  filter: { text: filter, caseSensitive },
  onSendMessage,
  disabled,
  collapseAll,
  onCollapseChange,
}) {
  const [root, setRoot] = useState(data);
  useEffect(() => {
    setRoot(data);
  }, [data]);

  const [problematicTranslations, setProblematicTranslations] = useState([]);
  useEffect(() => {
    if (root?.languages?.length) {
      setProblematicTranslations(
        findProblems(root.content, root.languages, matches)
      );
    }
  }, [matches, root]);

  const [filteredIds, setFilteredIds] = useState();
  useEffect(() => {
    if (root && filter) {
      setFilteredIds(findFilteredIDs(root.content, filter, caseSensitive));
    } else {
      setFilteredIds();
    }
  }, [caseSensitive, filter, root]);

  return (
    <TreeContext.Provider
      value={{
        collapseAll,
        onCollapseChange,
        disabled,
        filteredIds,
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
