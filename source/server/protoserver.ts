import express from 'express';
import { WebSocket, WebSocketServer } from 'ws';
import { JoinRequest, UpdateHistory, CloseRoom, CreateRoomEntry, type Room } from './IWDB.ts'
import { Db, MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const mongoUrl = 'mongodb://localhost:27017';
const client = new MongoClient(mongoUrl)
await client.connect();
let IWDB: Db;
console.log("Db client connected");
try {
    IWDB = client.db("Rooms");
    console.log("Connection to IWDB database successful");
    const collection = IWDB.collection<Room>('Rooms');
    collection.drop();
    console.log("Rooms table reset.");
}
catch (err) {
    console.log(err);
}


/*
let wsport = 2210;
const wss = new WebSocketServer({ port: wsport });
console.log(`WS server is listening on port ${wsport}`);
*/

//Seed room code generator
let roomcodeGen: number = 0;

//Seed socket generator
let socketGen: number = 7000;

//Potentially make an array that houses all open websockets?
/*
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
*/

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

app.get("/create", async (req, res) => {
    console.log("Incoming request on /create!");
    roomcodeGen++;
    socketGen++;
    let room = await CreateRoomEntry(IWDB, roomcodeGen, socketGen);
    res.send(room).status(200);
    const wss = new WebSocketServer({ port: socketGen });
    wss.on('connection', (ws) => {
        console.log("New client connected to server");

        ws.on('message', async (message) => {
            //console.log(`Server Received Message: ${message}`);
            let parsedMsg = JSON.parse(message);
            //console.log(`${IWDB}, ${parsedMsg.room.roomcode}, ${parsedMsg.strokeToDraw}`);
            let stroke = await UpdateHistory(IWDB, parsedMsg.room.roomcode, parsedMsg.strokeToDraw);
            console.log("after database call: "+stroke);
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
    console.log(`New room open on:${socketGen} `);
});

app.post("/join", async (req, res) => {
    console.log("Incoming join request on /join!");
    let roomcode = req.body.roomcode;
    let room = await JoinRequest(IWDB, roomcode);
    res.send(room).status(200);
});

app.post("/findroom", async (req, res) => {
    console.log("Incoming find request on /findroom! " + req.body);
    let roomcode = req.body.roomcode;
    let roomExists = false;
    let room = await JoinRequest(IWDB, roomcode);
    if (room) {
        roomExists = true;
        res.send(roomExists).status(200);
    }
    else {
        res.status(404).send(roomExists);
    }
});

const httpport = 2211;
app.listen(httpport, () => {
    console.log(`HTTP server is listening on port ${httpport}`);
});





