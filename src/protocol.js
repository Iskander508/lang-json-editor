const NodeType = {
  OBJECT: "OBJECT",
  VALUE: "VALUE",
};

const ActionType = {
  ADD: "ADD",
  CHANGE_VALUE: "CHANGE_VALUE",
  REMOVE: "REMOVE",
  DATA_UPDATE: "DATA_UPDATE",
  MATCHES_UPDATE: "MATCHES_UPDATE",
};

const MatchType = {
  EXACT: "exact",
  PARTIAL: "partial",
};

const Action = {
  add: (parentId, type, label) => ({
    action: ActionType.ADD,
    parentId,
    type,
    label,
  }),
  changeValue: (id, language, value) => ({
    action: ActionType.CHANGE_VALUE,
    id,
    language,
    value,
  }),
  remove: (id) => ({
    action: ActionType.REMOVE,
    id,
  }),
  dataUpdate: (data) => ({
    action: ActionType.DATA_UPDATE,
    data
  }),
  matchesUpdate: (data) => ({
    action: ActionType.MATCHES_UPDATE,
    data
  }),
};

module.exports = { NodeType, ActionType, Action, MatchType };
