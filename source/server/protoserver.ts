import express, { raw } from 'express';
import { WebSocket, WebSocketServer } from 'ws';
import { MongoDbServerUrl, type Room } from './IWDB.js'
import { CreateRoomEntry, JoinRequest, UpdateHistory, CloseRoom } from './IWDB.js'
import { Db, MongoClient } from 'mongodb';
import cors from 'cors';

//!!To have protoserver work you'll need to run a mongod process!

const app = express();
app.use(cors());
app.use(express.json());

const mongoUrl = MongoDbServerUrl;
const client = new MongoClient(mongoUrl)
client.connect();
let IWDB: Db;
console.log("Db client connected");
try {
    IWDB = client.db("Rooms");
    console.log("Connection to IWDB database successful");
    const collection = IWDB.collection<Room>('Rooms');
    collection.drop();
    console.log("Rooms table reset.");
} catch (error) {
    console.log(error);
}

//Seed room code generator
let roomcodeGen: number = 0;

//Seed socket generator
let socketGen: number = 7000;


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


/**
 * CreateRoom endpoint for the REST API - called to create a new room
 * @author BCampbell
 */
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
            let parsedMsg = JSON.parse(message);
            let stroke = await UpdateHistory(IWDB, parsedMsg.room._id, parsedMsg.strokeToDraw);
            //console.log("after database call: " + stroke);
            // if (message.request && message.request == "roomcode") {
            // ws.send(JSON.stringify({ response: "roomcode", code: createNewCode() }));
            // return;
            // }

            //Broadcast message to all connected clients
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
    // console.log(`New room open on:${socketGen} `);
});

/**
 * Join endpoint for the REST API - only called when room has been verified to exist
 * @author BCampbell
 */
app.post("/join", async (req, res) => {
    console.log("Incoming join request on /join!");
    let roomcode = req.body.roomcode;
    let room = await JoinRequest(IWDB, roomcode);
    res.send(room).status(200);
});

/**
 * FindRoom endpoint for the REST API - verifies a room exists and returns a JSON object
 * containing the info about the room.
 * @author BCampbell
 */
app.post("/findroom", async (req, res) => {
    console.log("Incoming find request on /findroom! ");
    let roomcode = req.body.roomcode;
    console.log(req.body.roomcode);
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


export { app };




