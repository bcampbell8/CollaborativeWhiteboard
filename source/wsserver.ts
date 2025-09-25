import { WebSocketServer } from 'ws';
import { nanoid as ShortId } from 'nanoid';


// https://stackoverflow.com/questions/13364243/websocketserver-node-js-how-to-differentiate-clients

var server = new WebSocketServer({ port: 2210 });


var rooms = [];


async function handleIncoming(message, socket) {
	
	// console.log(typeof message); // message is of type object
	// console.log(JSON.stringify(message, null, 2)); // returns object with `type` and `data` fields
	// console.log(message);
	// console.log(JSON.parse(message.toString()).action);
	// console.log(JSON.parse(message.toString()).code);
	// console.log(JSON.parse(message.toString()).info);
	// return;
	// parse message
	// ik this is a naive parse but
	let messageText = JSON.parse(message.toString());
	
	if (messageText.action == "open") {
		let newId = ShortId;
	} else if (messageText.action == "connect") {
		;
	} else if (messageText.action == "update") {
		;
	} else /*invalid action*/ {
		socket.send(JSON.stringify({ action: "error", code: null, info: "Invalid action" }));
	}
	
	// socket.send("works?"); // socket requires explicit local definition
	socket.id = server.getUniqueID(messageText.code);
	console.log(socket.id);
	
	// send connection success response which has current board state
	// last drawn location can be inferred by client from order of drawing lines
	socket.send(JSON.stringify({ action: "boardstate", code: messageText.code, info: /*boardstate info*/ }));
}


// server.getUniqueID = ShortId;
server.getUniqueID = function (code) {
	// information which must be attached to unique and grouped connections is added here
	// 
	// id must be a string, so is stringified before assignment and
	// must be parsed back to json before being accessed
	return JSON.stringify({ connectionId: ShortId(), roomCode: code });
};


server.on('connection', function connection(socket) {
	
	console.log("wss opened");
	socket.send("connected\n");
	
	socket.on('message', msg => handleIncoming(msg, socket));
	
	// executed at socket.onConnect()
	server.clients.forEach(function each(client) {
		// console.log("client.id: " + JSON.stringify(client.id));
	});
});


console.log("Websocket server listening on port 2210");
