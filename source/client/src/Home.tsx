import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
	
	const redirectToRoom = async function() {
		const code = await fetch("http://" + window.location.hostname + ":2211/joinroom");
		window.location.href = "/participate/" + code; // y `code` still a Promise here
	}
	
	return (<>
		<nav>
			<Link to="/host">Host a room</Link>
			<p />
			<form method="get" action={redirectToRoom}>
				<input type="text" name="code"></input>
				<input type="submit" value="Join"></input>
			</form>
		</nav>
	</>)
}

export default Home;
