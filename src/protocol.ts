export interface TNodeValues {
  [language: string]: string;
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
  values: TNodeValues;
};

export type TNode = TObjectNode | TValueNode;

type JsonDataValue = string | JsonData;
export interface JsonData extends Record<string, JsonDataValue> {}
