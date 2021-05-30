import { useEffect, useState } from "react";
import { Action } from "../protocol";
import { findProblems, NO_PROBLEM } from "./problem";
import { findIDs, findFilteredIDs } from "./filter";
import { TreeContext } from "./Context";
import { ObjectNode } from "./ObjectNode";

export default function Tree({
  data,
  sourceMatches,
  filter: { text: textFilter, caseSensitive, problems: problemsFilter },
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
        findProblems(root.content, root.languages, sourceMatches)
      );
    }
  }, [sourceMatches, root]);

  const [textFilteredIds, setTextFilteredIds] = useState();
  useEffect(() => {
    if (root && textFilter) {
      setTextFilteredIds(
        findFilteredIDs(root.content, textFilter, caseSensitive)
      );
    } else {
      setTextFilteredIds();
    }
  }, [caseSensitive, textFilter, root]);

  let filteredIds = textFilteredIds;
  if (root && problemsFilter?.length) {
    const IDs = textFilteredIds || findIDs(root.content);

    const problemIdMap = problematicTranslations.reduce(
      (aggr, { id, problem }) => {
        if (aggr[id]) {
          aggr[id].push(problem);
        } else {
          aggr[id] = [problem];
        }
        return aggr;
      },
      {}
    );

    filteredIds = IDs.filter(
      (id) =>
        (problemsFilter.includes(NO_PROBLEM) && !problemIdMap[id]) ||
        problemIdMap[id]?.some((problem) => problemsFilter.includes(problem))
    );
  }

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
        onOpen: (file, line, column) =>
          onSendMessage(Action.open(file, line, column)),
      }}
    >
      {root ? <ObjectNode node={root.content} /> : null}
    </TreeContext.Provider>
  );
}
