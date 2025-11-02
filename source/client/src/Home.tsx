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
	
	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(JSON.stringify(formdata));
		window.location.href = `/participate/${encodeURIComponent(formdata.code)}`;
	};
	
	const redirectToRoom = function(e) {
		// e.preventDefault();
		console.log(e);
		// window.location.href = `/participate/${encodeURIComponent(getCodeFromForm())}`;
		return false;
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
