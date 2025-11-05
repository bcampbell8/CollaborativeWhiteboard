import express from 'express';
import {WebSocket, WebSocketServer} from 'ws';


const app = express();

let wsport = 2210;
const wss = new WebSocketServer({port: wsport});
console.log(`WS server is listening on port ${wsport}`);

wss.on('connection', (ws) => {
    console.log("New client connected to server");

    ws.on('message', (message) => {
        console.log(`Server Received Message: ${message}`);
		let parsedMsg = JSON.parse(message);
		// if (message.request && message.request == "roomcode") {
			// ws.send(JSON.stringify({ response: "roomcode", code: createNewCode() }));
			// return;
		// }
        //Broadcast message to all connected clients
        // console.log(typeof(message));
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

function createNewCode() {
	let output = "";
	let characters = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890";
	let charlen = characters.length;
	for (let i = 0; i < 6; i++) {
		output += characters[Math.floor(Math.random() * charlen)];
	}
	
	// add roomcode to db
	
	return output;
}


app.get("/verifyroom", (request, response) => {
	
	// check if room in db
	
	response.send("true");
});

const httpport = 2211;
app.listen(httpport, () => {
    console.log(`HTTP server is listening on port ${httpport}`);
});





