#!/usr/bin/env node

const yargs = require("yargs")
  .usage(
    `
Usage: $0 [-p server_port] [-f input_file1 input_file2 ...] [--openBrowser] [--autoClose 2000] [--verbose]
		
Starts Editor server
`
  )
  .options({
    port: {
      alias: "p",
      type: "number",
      default: 3001,
      describe: "HTTP Server port",
    },
    file: {
      alias: "f",
      type: "array",
      demandOption: "Input files needed",
      describe: "Input translation files",
    },
    openBrowser: {
      type: "boolean",
      default: false,
      describe: "Auto-open the default browser with the editor on start",
    },
    verbose: {
      type: "boolean",
      default: false,
      describe: "Output debugging info",
    },
    autoClose: {
      type: "number",
      default: 0,
      defaultDescription: "0 (disabled)",
      describe:
        "Timeout (in msecs) after which the server stops when all clients are disconnected",
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

const app = express();

app.get("/data", (req, res) => {
  if (argv.verbose) console.log("Requested", req.url);
  const content = require(path.resolve(__dirname, argv.file[0]));
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify(content));
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

let clientsConnected = 0;
let autoClose;
const checkAutoClose = () => {
  if (clientsConnected <= 0 && argv.autoClose) {
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
  clientsConnected++;
  stopAutoClose();

  connection.on("close", () => {
    if (argv.verbose) console.log("Client disconnected");
    clientsConnected--;
    checkAutoClose();
  });

  connection.on("message", (message) => {
    if (argv.verbose) console.log("Message", message);
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
