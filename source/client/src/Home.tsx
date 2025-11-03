import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Home() {
	
	const [formdata, setFormData] = useState({ code: "" });
	
	const handleChange = (e) => {
		const { code, value } = e.target;
		setFormData({
			...formdata,
			code: value
		});
	};
	
	async function handleSubmit(e) {
		e.preventDefault();
		// console.log(JSON.stringify(formdata));
		
		// let roomExists = await fetch("http://" + window.location.hostname + ":2211/verifyroom");
		// if (roomExists == "false") {
			// return false; // idk what to do rn to indicate to the user that a room does not exist
		// }
		
		window.location.href = `/participate/${encodeURIComponent(formdata.code)}`;
	};
	
	return (<>
		<nav>
			<Link to={"/host"}>Host a room</Link>
			<p />
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="code"
					value={formdata.code}
					onChange={handleChange}
				/>
				<input type="submit" value="Join" />
			</form>
		</nav>
	</>)
}

export default Home;
