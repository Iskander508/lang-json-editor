const { loadFile, writeFile } = require("./file");
const lodash = require("lodash");
const { NodeType } = require("../protocol");
const openInEditor = require("open-in-editor");

function add(languageFiles, { parentId, type, label }) {
  Object.keys(languageFiles).forEach((language) => {
    const filePath = languageFiles[language];
    const content = loadFile(filePath);
    let item = parentId ? lodash.get(content, parentId) : content;
    if (!item) {
      lodash.set(content, parentId, {});
      item = lodash.get(content, parentId);
    }
    switch (type) {
      case NodeType.OBJECT:
        item[label] = {};
        break;
      case NodeType.VALUE:
        item[label] = null;
        break;
      default:
        console.error("Invalid add type:", type);
    }
    writeFile(filePath, content);
  });
}

function changeValue(languageFiles, { id, language, value }) {
  const filePath = languageFiles[language];
  const content = loadFile(filePath);
  writeFile(filePath, lodash.set(content, id, value));
}

function remove(languageFiles, { id }) {
  Object.keys(languageFiles).forEach((language) => {
    const filePath = languageFiles[language];
    const content = loadFile(filePath);
    if (lodash.get(content, id) !== undefined) {
      const itemPath = id.split(".");
      const itemLabel = itemPath.pop();
      const parentId = itemPath.join(".");
      const parent = parentId ? lodash.get(content, parentId) : content;
      delete parent[itemLabel];
    }
    writeFile(filePath, content);
  });
}

function open({ file, line, column }) {
  let path = file;
  if (line) {
    path += `:${line}`;
    if (column) {
      path += `:${column}`;
    }
  }
  const editor = openInEditor.configure(
    {
      editor: "code",
    },
    (err) => console.error(err)
  );
  editor.open(path).catch((err) => console.error(err));
}

module.exports = { add, changeValue, remove, open };
