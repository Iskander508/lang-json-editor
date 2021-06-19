import { useEffect, useState } from "react";
import { NodeType, TObjectNode, TSourceMatch } from "../protocol";
import {
  findProblems,
  NO_PROBLEM,
  Problem,
  TFindProblemsResult,
} from "./problem";
import { findIDs, findFilteredIDs } from "./filter";
import { TreeContext } from "./Context";
import { ObjectNode } from "./ObjectNode";

type TProblemsFilter = Array<Problem | typeof NO_PROBLEM>;
type TFilter = {
  text: string;
  caseSensitive: boolean;
  problems: TProblemsFilter;
};

type TreeProps = {
  data: TObjectNode;
  languages?: string[];
  sourceMatches?: TSourceMatch[];
  filter: TFilter;
  onAdd?: (id: string, type: NodeType, label: string) => void;
  onChangeValue?: (id: string, language: string, value: string) => void;
  onRemove?: (id: string) => void;
  disabled?: boolean;
  collapseAll?: boolean;
  onCollapseChange: () => void;
};

export default function Tree({
  data,
  languages,
  sourceMatches,
  filter: { text: textFilter, caseSensitive, problems: problemsFilter },
  onAdd,
  onChangeValue,
  onRemove,
  disabled,
  collapseAll,
  onCollapseChange,
}: TreeProps) {
  const [problematicTranslations, setProblematicTranslations] =
    useState<TFindProblemsResult>([]);
  useEffect(() => {
    if (languages?.length) {
      setProblematicTranslations(findProblems(data, languages, sourceMatches));
    }
  }, [sourceMatches, data, languages]);

  const [textFilteredIds, setTextFilteredIds] = useState<string[]>();
  useEffect(() => {
    if (data && textFilter) {
      setTextFilteredIds(findFilteredIDs(data, textFilter, caseSensitive));
    } else {
      setTextFilteredIds(undefined);
    }
  }, [caseSensitive, textFilter, data]);

  let filteredIds = textFilteredIds;
  if (data && problemsFilter?.length) {
    const IDs = textFilteredIds || findIDs(data);

    const problemIdMap = problematicTranslations.reduce<{
      [id: string]: Problem[];
    }>((aggr, { id, problem }) => {
      if (aggr[id]) {
        aggr[id].push(problem);
      } else {
        aggr[id] = [problem];
      }
      return aggr;
    }, {});

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
        languages: languages,
        onAdd,
        onChangeValue,
        onRemove,
      }}
    >
      {data ? <ObjectNode node={data} /> : null}
    </TreeContext.Provider>
  );
}
