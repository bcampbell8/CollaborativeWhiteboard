import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './style.css';
import Home from './Home.tsx';
import Host from './Host.tsx';
import Participant from './Participant.tsx';


function App() {
	
	const redirectToRoom = async function() {
		const code: string = await fetch("http://" + window.location.hostname + ":2211/joinroom");
	}
	
	return (<>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/host/:code" element={<Host />} />
			<Route path="/participate/:code" element={<Participant />} />
		</Routes>
	</>);
}

export default App;
