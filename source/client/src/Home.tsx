import React, { useState } from 'react';
//import type { ReactFormState } from 'react-dom/client';
import { Link } from 'react-router-dom';


type HomeProps = {
    address: string
    updateServerAddress: (value) => void
};

function Home(props: HomeProps) {
	
	const [formdata, setFormData] = useState({ code: "" });
	
	const handleChangeCode = (e) => {
		const { code, value } = e.target;
		setFormData({
			...formdata,
			code: value
		});
	};
	
	const handleChangeIp = (e) => {
		
		const { ip, value } = e.target;
		setFormData({
			...formdata,
			ip: value
		});
	};
	
	async function handleSubmitParticipant() {
		const roomFormcode = formdata.code;
		props.updateServerAddress(formdata.ip);
		// console.log(JSON.stringify(formdata));
		
		const response = await fetch("http://" + formdata.ip + ":2211/findroom",{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({roomcode: `${roomFormcode}`})
		});
		const roomExists = await response.json();

		if (roomExists) {
			window.location.href = `/participate/${encodeURIComponent(formdata.code)}`;
		}
	}
	
	async function handleSubmitHost() {
		// console.log("paddress0: " + JSON.stringify(props.address) + "  ip: " + e.get("ip"));
		
		const roomFormcode = formdata.code;
		
		// console.log("formdata: " + JSON.stringify(formdata));
		// console.log("formdata ip: " + formdata.ip);
		props.updateServerAddress(formdata.ip);
		// console.log("paddress no strgfy: " + props.address);
		// console.log("paddress1: " + JSON.stringify(props.address));
		
		const response = await fetch("http://" + formdata.ip + ":2211/create");
		// const roomExists = await response.json();

		// if (roomExists) {
			// redirect to /host
		// }
		window.location.href = "/host";
	}
	
	return (<>
		<nav style={{
			justifyContent: "center"
		}}>
			<form action={handleSubmitHost}>
				<input
					type="text"
					name="ip"
					value={formdata.ip}
					onChange={handleChangeIp}
				/>
				<input type="submit" value="Host" />
			</form>
			<form action={handleSubmitParticipant}>
				<input 
					type="text"
					name="ip"
					value={formdata.ip}
					onChange={handleChangeIp}
				/>
				<input
					type="text"
					name="code"
					value={formdata.code}
					onChange={handleChangeCode}
				/>
				<input type="submit" value="Join" />
			</form>
		</nav>
	</>)
}

export default Home;





