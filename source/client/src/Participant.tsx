import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Canvas from './assets/Canvas.tsx';
import type { Stroke } from './assets/Canvas.tsx';
import type { Room } from '../../server/IWDB.ts';
import RoomCodeText from './assets/RoomCodeText.tsx';


type ParticipantProps = {
    address
};

function Participant(props: ParticipantProps) {

    //const { code } = useParams();
    //const roomCode = decodeURIComponent(code);
    const [room, setRoom] = useState<Room>();
    //const [lineInfo, setLineInfo] = useState({});
    const [contextRef, setContextRef] = useState();
    const [socket, setSocket] = useState<WebSocket>();
    const [recievedStroke, setRecievedStroke] = useState([]);


    const sendStroke = (stroke: Stroke) => {
        if (stroke && socket && socket.readyState === WebSocket.OPEN) {
            let packet = {
                action: "Update",
                room: room,
                strokeToDraw: stroke
            }
            socket.send(JSON.stringify(packet));
        }
    }

    function socketOnMessage(event: any) {
        const message = JSON.parse(event.data);
        const messageHeader = message.action;
        if (messageHeader === "Update") {
            setRecievedStroke([message.strokeToDraw]);
        }
    }

    useEffect(() => {
        let roomcode = props.address.pathname.split('/')[2];
        fetch("http://" + props.address.hostname + ":2211/join", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomcode: roomcode })
        })
		.then(response => response.json())
		.then(incRoom => {
			let i = 0;
			
			//setRecievedStroke(incRoom)
			const newStrokes = recievedStroke.concat([]);
			for(let stroke of incRoom.strokeHistory){
				console.log(`stroke: ${i}`);
				newStrokes.push(stroke);
				//setRecievedStroke(stroke);//replaces the old one here
				i++;
			}
			setRecievedStroke(newStrokes);
			setRoom(incRoom);
			let newWebsocket = new WebSocket('ws://' + props.address.hostname + `:${incRoom.socketNumber}`, 'echo-protocol');
			newWebsocket.onopen = () => {
				console.log('WebSocket connection established');
			};

			newWebsocket.onmessage = socketOnMessage;

			newWebsocket.onclose = () => {
				console.log('WebSocket connection closed');
			};

			newWebsocket.onerror = (error) => {
				console.error('WebSocket error:', error);
			};
			setSocket(newWebsocket);
			return () => {
				newWebsocket.close();
			};
		});
        /*
        const newSocket = new WebSocket('ws://' + Address.hostname + ':2210', 'echo-protocol');
        setSocket(newSocket);

        newSocket.onopen = () => {
            console.log('WebSocket connection established');
        };

        newSocket.onmessage = socketOnMessage;

        newSocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            newSocket.close();
        };
        */

    }, []);


    return (<>
        <Canvas
            sendStroke={sendStroke}
            recievedStroke={recievedStroke}
        />

        {room && <RoomCodeText text={`roomcode: ${room._id} port: ${room.socketNumber} `} />}
    </>)
}

export default Participant;





