const path = require("path");
const fs = require("fs");

function loadFile(filepath) {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, filepath)));
}

function writeFile(filepath, content) {
  fs.writeFileSync(
    path.resolve(__dirname, filepath),
    JSON.stringify(content, undefined, 2)
  );
}

function loadFiles(filepaths) {
  const paths = filepaths.map((fp) => path.resolve(__dirname, fp));
  return paths.map((p) => loadFile(p));
}

module.exports = { loadFile, writeFile, loadFiles };
