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
  deepLKey?: string;
  onAdd?: (id: string, type: keyof typeof NodeType, label: string) => void;
  onChangeValue?: (id: string, language: string, value: string) => void;
  onRemove?: (id: string) => void;
  onOpen?: (file: string, line: number, column?: number) => void;
};

export const TreeContext = React.createContext<Props>({});
