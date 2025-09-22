import { WebSocketServer } from 'ws';
import { nanoid as ShortId } from 'nanoid';


// https://stackoverflow.com/questions/13364243/websocketserver-node-js-how-to-differentiate-clients

var server = new WebSocketServer({ port: 2210 });


function incoming(message: string) {
	
	// parse message
	// let code = message.substring(0, 6);
	// let action = message.substring(8, message.length - 1);
	
	// if (action == "connect") {
		// return [code, 1];
	// } else if (action == "host") {
		// return [code, 2];
	// } else /*action is canvas state*/ {
		// return [code, 3];
	// }
	
	
	let [action, code, info] = message.split(';');
}


// server.getUniqueID = ShortId;
server.getUniqueID = function () {
	return { id: ShortId(), room: "abcdef" };
};


server.on('connection', function connection(socket) {
	
	socket.id = server.getUniqueID();
	
	console.log("wss opened");
	socket.send("connected\n");
	
	socket.on('message', incoming(message));
});


console.log("Websocket server listening on port 2210");
