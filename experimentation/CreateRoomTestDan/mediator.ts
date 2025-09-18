const WebSocket = require('ws');
var shortid = require('shortid');

const wss = new WebSocket.Server({ port: 2210 });

wss.on('connection', function connection(ws) {
	console.log("wss opened");
	
	ws.on('message', function incoming(message) {
		console.log("message:");
		console.log(message);
	});
	ws.on('close', function() {
		console.log("wss closed");
	});
});

console.log("mediator listening on port 2210");

