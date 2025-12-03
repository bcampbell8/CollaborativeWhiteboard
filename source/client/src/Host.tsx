import React, { useState, useEffect } from 'react'
//import { useParams } from 'react-router-dom';
import './style.css'
import Canvas, { type Stroke } from './assets/Canvas.tsx';
import RoomCodeText from './assets/RoomCodeText.tsx';
import type { Room } from '../../server/IWDB.ts'



function Host() {

	const [room, setRoom] = useState<Room>();
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

	function socketOnMessage(event) {
		const message = JSON.parse(event.data);
		const messageHeader = message.action;
		if (messageHeader === "Update") {
			setRecievedStroke([message.strokeToDraw]);
		}

	}

	useEffect(() => {
		fetch("http://" + window.location.hostname + ":2211/create")
			.then(response => response.json())
			.then(incRoom => {
				setRoom(incRoom);
				let newWebsocket = new WebSocket('ws://' + window.location.hostname + `:${incRoom.socketNumber}`, 'echo-protocol');
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
	}, []);



	return (<>
		<Canvas
			sendStroke={sendStroke}
			recievedStroke={recievedStroke}
		/>
		{room && <RoomCodeText text={`roomcode: ${room.roomcode} port: ${room.socketNumber} `} />}
	</>)
}

export default Host;





