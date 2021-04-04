const fs = require("fs");
const { findFiles } = require("./file");
const { MatchType } = require("../protocol");

function discover(path, regex) {
  const results = [];
  fs.readFileSync(path)
    .toString()
    .split("\n")
    .forEach((line, index, all) => {
      const matches = line.match(regex);
      if (matches) {
        const contextStartIndex = Math.max(index - 5, 0);
        matches.forEach((match) => {
          results.push({
            id: match.replace(/[`'"${]/g, "").replace(/\.$/, ""),
            line: index,
            contextStartIndex,
            context: all.slice(contextStartIndex, contextStartIndex + 10),
          });
        });
      }
    });

  return results;
}

function getSourceMatches(globPatternFiles, cb, verbose) {
  findFiles(globPatternFiles, (files) => {
    if (verbose) {
      console.log(`Looking for translation IDs in ${files.length} files.`);
    }
    const items = [];
    files.forEach((file) => {
      discover(file, /'(\w+\.)+\w+'/g).forEach((item) =>
        items.push({ ...item, file, type: MatchType.EXACT })
      );
      discover(file, /"(\w+\.)+\w+"/g).forEach((item) =>
        items.push({ ...item, file, type: MatchType.EXACT })
      );
      discover(file, /`(\w+\.)+\$\{/g).forEach((item) =>
        items.push({ ...item, file, type: MatchType.PARTIAL })
      );
    });
    if (verbose) {
      console.log(
        `Looking for translation IDs finished with ${items.length} occasions.`
      );
    }
    cb(items);
  });
}

module.exports = { getSourceMatches };
