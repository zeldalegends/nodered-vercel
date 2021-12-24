const http = require('http');
const express = require("express");
const RED = require("node-red");

var app = express();
app.use("/", express.static("public"));
var server = http.createServer(app);

var settings = {
	httpAdminRoot: "/",
	httpNodeRoot: "/",
	userDir: ".",
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

/** const https = require('https');
const options = 'https://nodered.zeldalegends.repl.co';

//const options = {hostname: 'nodered.zeldalegends.repl.co',	port: 80,	path: '/test',	headers: {'User-Agent': 'Mozilla/5.0'}};

setInterval(() => {
	https.request(options, res => {
		res.on('data', d => {
			//process.stdout.write(d);
			console.log(` (statusCode: ${res.statusCode})`);
		})
	})
		.on('error', error => {
			console.error(error)
		})
		.end();
}, 60000);

//console.log(process.version);
//console.log(Object.values(require('os')));
*/