# Interactive Whiteboard Protocol (IWP) Prototype

## Actions to Consider to Encode in the Protocol
- Requesting a room to be found
- Creating a room
- Transmitting room data
- Leaving a room (?)
- Updating canvas state (broadcasting changes to each participant) and transmitting a stroke (sending a stroke to the database to add to the history)
- (Extension) Chat messages / Chat history

## Suggested methods

### Get
- Resquest: requests a room with a code (and password?)
- Response: Server sends back resource with room history 

### Create
- Request: Requests to open a room, basically asking for a new socket to be opened?
- Response: Server assign a room code, sets a socket which future updates will be run through

### Update
- Request: User sends stroke data to update room history
- Response: Server adds stroke to history, then sends response to all connections with updated room history.

### Close
- Request: User sends a request to close the room
- Response: DB sends a redirect action to participants (to home page) and deletes room information