const fs = require("fs");

function loadFile(filepath) {
  return JSON.parse(fs.readFileSync(filepath));
}

function writeFile(filepath, content) {
  fs.writeFileSync(filepath, JSON.stringify(content, undefined, 2));
}

function loadFiles(filepaths) {
  return filepaths.map((p) => loadFile(p));
}

module.exports = { loadFile, writeFile, loadFiles };
