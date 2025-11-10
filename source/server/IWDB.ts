import {MongoClient} from 'mongodb';

//probably will need to change the url at some point from localhost?
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'Rooms';

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

async function 