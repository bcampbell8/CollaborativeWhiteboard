import { Db, MongoClient } from 'mongodb';
import type { Stroke } from '../client/src/assets/Canvas'



// probably will need to change the url at some point from localhost?
// sorry for changing it  -D
const MongoDbServerUrl = 'mongodb://10.1.1.35:27017';
export { MongoDbServerUrl };

const client = new MongoClient(MongoDbServerUrl);

//Provide reference name for database and table (collection)
const dbName = 'IWDB';


//Create hash map that maps protocol actions to associated functions
// const actionMap = {
//     "Create": CreateRoomEntry,
//     "Join": JoinRequest,
//     "Update": UpdateHistory,
//     "Close": CloseRoom
// }

//Interface helps provide typing information for table and handling socket connections
export interface Room {
    roomcode: string;
    socketNumber: number;
    strokeHistory: Array<Stroke>
    participants: Array<String>
}

export async function CreateRoomEntry(db: Db, roomcode: number, socket: number) : Promise<Room | null> {
    const collection = db.collection<Room>('Rooms');
    const room: Room = {
        roomcode: `${roomcode}`,
        socketNumber: socket,
        strokeHistory: [],
        participants: []
    };
    try {
        const result = await collection.insertOne(room);
    if (result === null) {
        throw new Error("Error creating room");
    }
		return room;
    } catch(error) {
        console.log(error);
        return null;
    }
}

export async function UpdateHistory(db: Db, roomCode:string, incomingStroke: Stroke) : Promise<Stroke[] | null> {
    const collection = db.collection<Room>('Rooms');
    const history = await RetrieveRoomHistory(db, roomCode);
    if (history === null) {
        return null
    }
    
    history.strokeHistory.push(incomingStroke);
    console.log(history);
    collection.updateOne({roomcode: `${roomCode}`}, {
        $set: {
            strokeHistory: history.strokeHistory
        }
    });
    return history;
}

export async function CloseRoom(db: Db, roomCode:string) : Promise<Room | null> {
    const collection = db.collection<Room>('Rooms');
    try{
        const room = await collection.findOneAndDelete(
            {roomcode: `${roomCode}`}
		);
        if (room === null) {
            throw new Error("Room not found.");
        }
        return room;
    } catch(error) {
        console.log(error);
        return null;
    }
}

async function RetrieveRoomHistory(db: Db, roomCode: string): Promise<Stroke[] | null> {
    const collection = db.collection<Room>('Rooms');
    try {
        const history = await collection.findOne<Stroke[]>(
            {roomcode: `${roomCode}`}, {
                //This exclusively retrieves the stroke history
                projection: {_id: 0, strokeHistory: 1}
            }
        );
        if (history === null) {
             throw new Error("Room history not found."); 
        }
        console.log("before database serves: "+history);
        return history;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function JoinRequest(db: Db, roomCode: string): Promise<Room | null> {
    const collection = db.collection<Room>('Rooms');
    try {
        const room = await collection.findOne<Room>(
            {roomcode: `${roomCode}`}
        );
        if (room === null) {
            throw new Error("Room not found.");
        }
        return room;
    } catch (error) {
        console.log(error);
        return null;
    }
}




//note to self: employ response codes for calls to express api

/*
Design of database code

First, start database instance
Then, initialise a rooms schema
Next, implement handling of requests (CRUD)
- Create request: A new entry is written to database. Assign websocket etc.
- Join request: Run a search on DB with the associated code provided. 
    - If found, return stroke history and add to participants
    - If not found, return error
- Update request: Writing to existing entry at specified room code
    - If room not found, error
    - If room found, add stroke to stroke history (better) OR send client's updated stroke history (worse for concurrency) 
- Close request: If no participants, room is deleted. Websocket is closed
- Undo will have its own fun issues to address :)
- Might need to record participant IDs to associate with stroke
When server is closed, truncate the table

*/

