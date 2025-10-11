import React, { useState } from 'react'
import './style.css'
import Canvas from './Canvas.tsx';
import PaintColourButton from './PaintColourButton.tsx';
import BrushWidthSlider from './BrushWidthSlider.tsx';


const startingBrushColour = "#000000";
const startingBrushWidth = 5;

function App() {
	const [globalBrushColour, updateBrushColour] = useState(startingBrushColour);
	const [globalBrushWidth, updateBrushWidth] = useState(startingBrushWidth);
	
	return (<>
		<Canvas brushColour={globalBrushColour} brushWidth={globalBrushWidth} />
		<BrushWidthSlider initialWidth={startingBrushWidth} updateBrushWidthFunction={updateBrushWidth} />
		<PaintColourButton initialBrushColour={startingBrushColour} updateBrushColourFunction={updateBrushColour} />
	</>)
}

export default App
