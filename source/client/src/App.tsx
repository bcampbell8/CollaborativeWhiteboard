import React, { useState } from 'react'
import './style.css'
import Canvas from './Canvas.tsx';
import PaintColourButton from './PaintColourButton.tsx';


const startingBrushColour = "#000000";

function App() {
	const [globalBrushColour, updateBrushColour] = useState(startingBrushColour);
	
	return (<>
		<Canvas brushColour={globalBrushColour} />
		<PaintColourButton initialBrushColour={startingBrushColour} updateBrushColourFunction={updateBrushColour} />
	</>)
}

export default App
