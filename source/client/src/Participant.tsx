import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './style.css'
import Canvas from './assets/Canvas.tsx';
import type { Stroke } from './assets/Canvas.tsx';
import type { Room } from '../../server/IWDB.ts';
import PaintColourButton from './assets/PaintColourButton.tsx';
import BrushWidthSlider from './assets/BrushWidthSlider.tsx';
import BackgroundColourButton from './assets/BackgroundColourButton.tsx';
import EraserButton from './assets/EraserButton.tsx';
import RoomCodeText from './assets/RoomCodeText.tsx';



function Participant() {

    //const { code } = useParams();
    //const roomCode = decodeURIComponent(code);
    const [room, setRoom] = useState<Room>();
    //const [lineInfo, setLineInfo] = useState({});
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
        //What about if my colour / thickness is different?
        const message = JSON.parse(event.data);
        const messageHeader = message.action;
        if (messageHeader === "Update") {
            setRecievedStroke(message.strokeToDraw);
        }
    }

    useEffect(() => {
        let roomcode = window.location.pathname.split('/')[2];
        fetch("http://" + window.location.hostname + ":2211/join", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomcode: roomcode })
        })
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
        /*
        const newSocket = new WebSocket('ws://' + window.location.hostname + ':2210', 'echo-protocol');
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
            updateContextRef={setContextRef}
            recievedStroke={recievedStroke}
        />

        {room && <RoomCodeText text={room.roomcode} />}
    </>)
}

export default Participant;





