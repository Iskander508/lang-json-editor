const fs = require("fs");
const glob = require("glob")

function loadFile(filepath) {
  return JSON.parse(fs.readFileSync(filepath));
}

function writeFile(filepath, content) {
  fs.writeFileSync(filepath, JSON.stringify(content, undefined, 2));
}

function loadFiles(filepaths) {
  return filepaths.map((p) => loadFile(p));
}

const cache = {};
function findFiles(globPattern, cbFiles) {
  return glob(globPattern, {silent: true, cache}, (err, matches) => {
    if (err) return cbFiles([]);
    return cbFiles(matches);
  });
}

module.exports = { loadFile, writeFile, loadFiles, findFiles };
