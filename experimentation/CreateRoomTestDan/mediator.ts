const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 2210 });

let rooms = [];
// what about readline.createInterface() from "async stdin.js" allows `for await (const line of rl) {}` ??
// https://stackoverflow.com/questions/67961004/whats-the-control-flow-of-for-await-of

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


function onConnection(message) {
	
}

async function Resolve(process) {
	const connection = await process;
	rooms.push({ code: , connection:  }); //
}

async function ListenForConnections() {
	const wss = new WebSocket.Server({ port: 2210 });
	wss.on("connection", (ws) => {
		ws.on("message", () => {});
	});
}

