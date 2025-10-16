import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './style.css'


function App() {
	return (<>
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/host">Host a room</Link>
						</li>
						<li>
							<Link to="/participate">Join a room</Link>
						</li>
					</ul>
				</nav>

				<Routes>
					<Route path="/host" exact>
						<Host />
					</Route>
					<Route path="/participate" exact>
						<Participant />
					</Route>
				</Routes>
			</div>
		</Router>
	</>);
}

export default App;
