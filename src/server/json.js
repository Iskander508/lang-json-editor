const path = require("path");
const lodash = require("lodash");
const { NodeType, ActionType } = require("../protocol");
const ACTION = require("./action");
const { loadFiles } = require("./file");

let languageFiles = {};
function initializeLanguages(files) {
  const paths = files.map((file) => path.resolve(__dirname, file));

  // find first unique name in the path and consider it as language
  const pathParts = paths.map((p) =>
    p
      .replace(/[.\\]/g, "/")
      .split("/")
      .filter((part) => part)
      .reverse()
  );

  const shortestPathLength = pathParts.reduce(
    (min, p) => (min && min < p.length ? min : p.length),
    0
  );

  let languageNames;
  for (let i = 0; i < shortestPathLength; i++) {
    const parts = pathParts.map((p) => p[i]);
    const sorted = [...parts].sort();
    if (!sorted.some((v, index) => index && v === sorted[index - 1])) {
      languageNames = parts;
      break;
    }
  }

  if (!languageNames) {
    throw new Error(`Couldn't deduce languages from [${paths}]`);
  }

  languageFiles = languageNames.reduce(
    (aggr, language, index) => ({
      ...aggr,
      [language]: paths[index],
    }),
    {}
  );
  return languageFiles;
}

function transform(tree, getValues, id) {
  const result = {
    id,
    name: id ? id.split(".").reverse()[0] : "root",
    type: NodeType.OBJECT,
    children: Object.keys(tree).map((key) => {
      const itemId = id ? `${id}.${key}` : key;
      if (tree[key] === null || typeof tree[key] === "string") {
        return {
          id: itemId,
          name: key,
          type: NodeType.VALUE,
          values: getValues(itemId),
        };
      }
      return transform(tree[key], getValues, itemId);
    }),
  };
  return result;
}

function getLanguageData() {
  const languages = Object.keys(languageFiles);
  const contents = loadFiles(Object.values(languageFiles));
  const tree = lodash.merge({}, ...contents);
  const getValues = (id) =>
    languages.reduce(
      (aggr, language, index) => ({
        ...aggr,
        [language]: lodash.get(contents[index], id),
      }),
      {}
    );
  return { languages, content: transform(tree, getValues) };
}

function handleAction(action) {
  switch (action.action) {
    case ActionType.ADD:
      ACTION.add(languageFiles, action);
      break;
    case ActionType.CHANGE_VALUE:
      ACTION.changeValue(languageFiles, action);
      break;
    case ActionType.REMOVE:
      ACTION.remove(languageFiles, action);
      break;
    default:
      console.error("Unknown action:", action.action);
  }
}

module.exports = { getLanguageData, initializeLanguages, handleAction };
