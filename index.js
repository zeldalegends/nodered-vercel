console.log("Node-RED on line (embedded version)");
console.log(Object.values(require('os')));
console.log(Object.values(process));

var http = require('http');
var express = require("express");
var RED = require("node-red");

var app = express();
app.use("/",express.static("public"));
var server = http.createServer(app);

var settings = {
  httpAdminRoot:"/",
  httpNodeRoot: "/",
  userDir:"./",
  flowFile: "flows.json",
  credentialSecret: false,
  editorTheme: {
    projects: {
      enabled: false,
    },
    codeEditor: {
      lib: "monaco",
      options: {
        theme: "vs"
      }
    }
  },
};

RED.init(server, settings);
app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);
server.listen(8000);
RED.start();