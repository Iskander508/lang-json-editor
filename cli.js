#!/usr/bin/env node

const yargs = require("yargs")
  .usage(
    `
Usage: $0 -f input_file1[,lang] [input_file2[,lang] ...] [-p server_port] [--openBrowser] [--autoClose 2000] [--verbose]
		
Starts Editor server
`
  )
  .options({
    file: {
      alias: "f",
      type: "array",
      demandOption: "Input files needed",
      describe: "Input translation files, specify the language code after comma if not autodetected from file path",
    },
    port: {
      alias: "p",
      type: "number",
      default: 3001,
      describe: "HTTP Server port",
    },
    openBrowser: {
      type: "boolean",
      default: false,
      describe: "Auto-open the default browser with the editor on start",
    },
    autoClose: {
      type: "number",
      default: 0,
      defaultDescription: "0 (disabled)",
      describe:
        "Timeout (in msecs) after which the server stops when all clients are disconnected",
    },
    verbose: {
      type: "boolean",
      default: false,
      describe: "Output debugging info",
    },
  })
  .strict()
  .help()
  .alias("h", "help");

const argv = yargs.argv;
const PORT = argv.port;

const express = require("express");
const path = require("path");
const http = require("http");
const WebSocket = require("ws");
const { translate } = require("bing-translate-api");

const {
  getLanguageData,
  initializeLanguages,
  handleAction,
} = require("./src/server/json");
const { Action } = require("./src/protocol");

const langs = initializeLanguages(argv.file);
if (argv.verbose) {
  console.log("Initialized with languages", langs);
}

const app = express();

app.get("/data", (req, res) => {
  if (argv.verbose) console.log("Requested", req.url);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify(getLanguageData()));
});

app.get("/translate", (req, res) => {
  if (argv.verbose) console.log("Requested", req.url, req.query);
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { text, from, to } = req.query;
  translate(text, from, to)
    .then(({ translation }) => {
      if (argv.verbose) console.log("Sending translation", translation);
      res.send(translation);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err.toString());
    });
});

app.get("/", (req, res) => {
  if (argv.verbose) console.log("Requested", req.url);
  res.sendFile(path.join(__dirname + "/web/index.html"));
});

app.get("/*", (req, res) => {
  if (argv.verbose) console.log("Requested", req.url);
  res.sendFile(path.join(__dirname + "/web" + req.url));
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const clientsConnected = [];
let autoClose;
const checkAutoClose = () => {
  if (!clientsConnected.length && argv.autoClose) {
    autoClose = setTimeout(() => {
      console.log("Auto-closing, no connected clients");
      process.exit();
    }, argv.autoClose);
  }
};
const stopAutoClose = () => {
  if (autoClose) {
    clearTimeout(autoClose);
    autoClose = null;
  }
};

wss.on("connection", (connection) => {
  if (argv.verbose) console.log("Client connected");
  clientsConnected.push(connection);
  stopAutoClose();

  connection.on("close", () => {
    if (argv.verbose) console.log("Client disconnected");
    const index = clientsConnected.findIndex((c) => c === connection);
    if (index !== -1) {
      clientsConnected.splice(index, 1);
      checkAutoClose();
    }
  });

  connection.on("message", (message) => {
    if (argv.verbose) console.log("Message", message);
    handleAction(JSON.parse(message));
    clientsConnected.forEach((c) =>
      c.send(JSON.stringify(Action.dataUpdate(getLanguageData())))
    );
  });
});
checkAutoClose();

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Listening at ${url}`);

  if (argv.openBrowser) {
    const open = require("open");
    open(url);
  }
});
