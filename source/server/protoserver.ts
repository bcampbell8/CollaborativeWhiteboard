import express from 'express';
import {WebSocket, WebSocketServer, Server} from 'ws';


const app = express();
const wss = new WebSocketServer({port: 2210});

wss.on('connection', (ws) => {
    console.log("New client connected");

    ws.on('message', (message) => {
        console.log(`Received Message: ${message}`);
        //Broadcast message to all connected clients
        console.log(typeof(message));
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    })
})

const PORT = 2211;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})