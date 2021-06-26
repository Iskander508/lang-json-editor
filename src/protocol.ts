export interface TNodeValues {
  [language: string]: string;
}

export enum ActionType {
  ADD = "ADD",
  CHANGE_VALUE = "CHANGE_VALUE",
  REMOVE = "REMOVE",
  OPEN = "OPEN",
  DATA_UPDATE = "DATA_UPDATE",
  SOURCE_MATCHES_UPDATE = "SOURCE_MATCHES_UPDATE",
}

export enum MatchType {
  EXACT = "exact",
  PARTIAL = "partial",
}

export interface TSourceMatch {
  id: string;
  file: string;
  line: number;
  contextStartLine: number;
  context: string[];
  type: MatchType;
}

export enum NodeType {
  OBJECT = "OBJECT",
  VALUE = "VALUE",
}

export type TObjectNode = {
  id: string;
  name: string;
  type: NodeType.OBJECT;
  children: TNode[];
};

export type TValueNode = {
  id: string;
  name: string;
  type: NodeType.VALUE;
  exactSourceMatches?: TSourceMatch[];
  partialSourceMatches?: TSourceMatch[];
  values: TNodeValues;
};

export type TNode = TObjectNode | TValueNode;

type JsonDataValue = string | JsonData;
export interface JsonData extends Record<string, JsonDataValue> {}
