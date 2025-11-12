import React, { useState, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom';
import './style.css'
import Canvas, { type Stroke } from './assets/Canvas.tsx';
import RoomCodeText from './assets/RoomCodeText.tsx';
import type {Room} from '../../server/IWDB.ts'



function Host() {

	async function getRoomData() {
		try{
			const response = await fetch("http://localhost:2211/create");
			if (!response.ok){
				throw new Error(`Error retrieving room creation data: ${response.status}`);
			}
			const data = response.json();
			console.log(data);
			return data;
		} catch (error){
			console.error(error);
			return null;
		}
	}
	let roomCode = "";

	const [room, setRoom] = useState();
	const [lineInfo, setLineInfo] = useState({});
	const [contextRef, setContextRef] = useState();
	const [socket, setSocket] = useState<WebSocket>();
	const [recievedStroke, setRecievedStroke] = useState({});


	const sendStroke = (stroke: Stroke) => {
		if (stroke && socket && socket.readyState === WebSocket.OPEN) {
			let packet = {
				action: "Update",
				strokeToDraw: stroke
			}
			socket.send(JSON.stringify(packet));
		}
	}

	function socketOnMessage(event) {
		// This is probably quite scuffed and there needs to be more done such as updating stroke history etc.
		// What about if my colour / thickness is different?
		const message = JSON.parse(event.data);
		const messageHeader = message.action;
		if (message.response && message.response == "roomcode") {
			roomCode = message.code;
		}
		if (messageHeader === "Update") {
			setRecievedStroke(message.strokeToDraw);
		}

	}

	useLayoutEffect(() => {
		getRoomData();
		const newSocket = new WebSocket('ws://' + window.location.hostname + ':2210', 'echo-protocol');
		setSocket(newSocket);

		newSocket.onopen = () => {
			console.log('WebSocket connection established');

			newSocket.send(JSON.stringify({ request: "roomcode" }));
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

	}, []);


	return (<>
		<Canvas
			sendStroke={sendStroke}
			updateContextRef={setContextRef}
			recievedStroke={recievedStroke}
		/>

		<RoomCodeText text={roomCode} />
	</>)
}

export default Host;





