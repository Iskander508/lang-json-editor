import React from "react";
import { NodeType } from "../protocol";
import { TFindProblemsResult } from "./problem";

type Props = {
  collapseAll?: boolean;
  onCollapseChange?: () => void;
  disabled?: boolean;
  filteredIds?: string[];
  problematicTranslations?: TFindProblemsResult;
  languages?: string[];
  onAdd?: (id: string, type: NodeType, label: string) => void;
  onChangeValue?: (id: string, language: string, value: string) => void;
  onRemove?: (id: string) => void;
};

export const TreeContext = React.createContext<Props>({});
