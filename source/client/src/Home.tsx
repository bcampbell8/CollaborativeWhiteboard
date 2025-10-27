import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
	
	const getRoomCode = function() : string {
		// const code: string = fetch("http://" + window.location.hostname + ":2211/joinroom");
		let code = "";
		let characters = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
		for (let i = 0; i < 6; i++) {
			code += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return code;
	}
	
	const getCodeFromForm = function() {}
	
	const redirectToRoom = function() {
		// window.location.href = `/participate/${encodeURIComponent(getCodeFromForm())}`;
	}
	
	return (<>
		<nav>
			<Link to={`/host/${encodeURIComponent(getRoomCode())}`}>Host a room</Link>
			<p />
			<form>
				<input type="text" name="code"></input>
				<input onClick={redirectToRoom()} type="submit" value="Join"></input>
			</form>
		</nav>
	</>)
}

export default Home;
