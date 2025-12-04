import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './style.css';
import Home from './Home.tsx';
import Host from './Host.tsx';
import Participant from './Participant.tsx';


function App() {
	
	const [serverAddress, setServerAddress] = useState("");
	function middle(input) {
		console.log(typeof input);
		console.log("middle: " + input);
		setServerAddress(input);
		console.log("addr: " + serverAddress);
	}
	console.log("app serverAddr: " + serverAddress);
	return (<>
		<Routes>
			<Route
				path="/"
				element={<Home
					address={serverAddress}
					updateServerAddress={middle}
				/>}
			/>
			<Route
				path="/host"
				element={<Host
					address={serverAddress}
				/>}
			/>
			<Route
				path="/participate/:code"
				element={<Participant
					address={serverAddress}
					roomcode={"bruh"}
				/>}
			/>
		</Routes>
	</>);
}

export default App;
