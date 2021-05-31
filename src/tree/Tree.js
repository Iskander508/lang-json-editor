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
  const [problematicTranslations, setProblematicTranslations] = useState([]);
  useEffect(() => {
    if (data?.languages?.length) {
      setProblematicTranslations(
        findProblems(data.content, data.languages, sourceMatches)
      );
    }
  }, [sourceMatches, data]);

  const [textFilteredIds, setTextFilteredIds] = useState();
  useEffect(() => {
    if (data && textFilter) {
      setTextFilteredIds(
        findFilteredIDs(data.content, textFilter, caseSensitive)
      );
    } else {
      setTextFilteredIds();
    }
  }, [caseSensitive, textFilter, data]);

  let filteredIds = textFilteredIds;
  if (data && problemsFilter?.length) {
    const IDs = textFilteredIds || findIDs(data.content);

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
        languages: data?.languages,
        deepL: data?.deepL,
        onAdd: (id, type, label) => onSendMessage(Action.add(id, type, label)),
        onChangeValue: (id, language, value) =>
          onSendMessage(Action.changeValue(id, language, value)),
        onRemove: (id) => onSendMessage(Action.remove(id)),
        onOpen: (file, line, column) =>
          onSendMessage(Action.open(file, line, column)),
      }}
    >
      {data ? <ObjectNode node={data.content} /> : null}
    </TreeContext.Provider>
  );
}
