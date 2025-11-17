import React, { useState } from 'react';
import type { ReactFormState } from 'react-dom/client';
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
	
	async function handleSubmit(e: FormData) {
		//e.preventDefault();
		const roomFormcode = e.get("code");
		console.log(roomFormcode);
		// console.log(JSON.stringify(formdata));
		
		// let roomExists = await fetch("http://" + window.location.hostname + ":2211/verifyroom");
		// if (roomExists == "false") {
			// return false; // idk what to do rn to indicate to the user that a room does not exist
		// }
		
		const response = await fetch("http://" + window.location.hostname + ":2211/findroom",{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({roomcode: `${roomFormcode}`})
		});
		const roomExists = await response.json();

		if (roomExists){
			window.location.href = `/participate/${encodeURIComponent(formdata.code)}`;
		}
		
	};
	
	return (<>
		<nav style={{
			justifyContent: "center"
		}}>
			<Link to={"/host"}>Host a room</Link>
			<form action={handleSubmit}>
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
