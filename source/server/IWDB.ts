import {MongoClient} from 'mongodb';

//probably will need to change the url at some point from localhost?
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

//Provide reference name for database and table (collection)
const dbName = 'IWDB';
const collectionName = 'Rooms';
//const roomsSchema = new mongo

async function CreateDatabaseAndCollection(){
    const client = new MongoClient(url);

    //Awaits connection from mongo client instance?
    await client.connect();
    console.log("Backend connected");

    //Create database and collction on client 
    try{
        const db = client.db(dbName);
        await db.createCollection(collectionName, );
    }
    catch(err){
        console.log(err);
    }
    finally{
        await client.close();
        console.log("Connection closed");
    } 

}

async function main(){
    CreateDatabaseAndCollection();

}

main();

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
When server is closed, truncate the schema







*/

