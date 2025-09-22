import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ port: 2210 });

let rooms = [];
// what about readline.createInterface() from "async stdin.js" allows `for await (const line of rl) {}` ??
// https://stackoverflow.com/questions/67961004/whats-the-control-flow-of-for-await-of

server.on('connection', function connection(socket) {
	console.log("wss opened");
	socket.send("connected\n");
	
	socket.on('message', function incoming(message) {
		console.log("message:");
		console.log(message);
		socket.send("message recieved\n");
	});
	socket.on('close', function() {
		console.log("wss closed");
	});
});

console.log("mediator listening on port 2210");


function onConnection(message) {
	// parse message
	let code = message.substring(0, 6);
	let action = message.substring(8, message.length - 1);
	
	if (action == "connect") {
		return [code, 1];
	} else if (action == "host") {
		return [code, 2];
	} else /*action is canvas state*/ {
		return [code, 3];
	}
}

async function Resolve(process) {
	const connection = await process;
	console.log("process resolved");
	// rooms.push({ code: , connection:  }); //
}

async function* ListenForConnections() {
	while (true) {
		const wss = new WebSocket.Server({ port: 2210 });
		wss.on("connection", (ws) => {
			console.log("connected");
			ws.on("message", () => {});
		});
		// yield wss; // listen until connected then yield
	}
}


async function main() {
	for await (let connection of ListenForConnections()) {
		console.log("resolving");
		Resolve(connection);
		console.log("resolved");
	}
}

// main();


