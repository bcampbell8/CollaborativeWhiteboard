import React, { useState } from 'react'
import './style.css'
import Canvas from './Canvas.tsx';
import PaintColourButton from './PaintColourButton.tsx';
import BrushWidthSlider from './BrushWidthSlider.tsx';
import BackgroundColourButton from './BackgroundColourButton.tsx';
import EraserButton from './EraserButton.tsx';


const startingBrushColour = "#000000";
const startingBrushWidth = 5;
const startingBackgroundColour = "#F0F0F0";
const startingEraserState = false;



function App() {
	
	function updateErasing(value: boolean) {
		updateEraserState(value);
		updateBrushColour(globalBackgroundColour);
	}
	
	const [globalBrushColour, updateBrushColour] = useState(startingBrushColour);
	const [globalBrushWidth, updateBrushWidth] = useState(startingBrushWidth);
	const [globalBackgroundColour, updateBackgroundColour] = useState(startingBackgroundColour);
	const [globalEraserState, updateEraserState] = useState(startingEraserState);
	
	return (<>
		<Canvas
			brushColour={globalBrushColour}
			brushWidth={globalBrushWidth}
			backgroundColour={globalBackgroundColour}
		/>
		
		<BrushWidthSlider
			initialWidth={startingBrushWidth}
			updateBrushWidthFunction={updateBrushWidth}
		/>
		
		<PaintColourButton
			initialBrushColour={startingBrushColour}
			updateBrushColourFunction={updateBrushColour}
		/>
		
		<BackgroundColourButton
			initialBackgroundColour={startingBackgroundColour}
			updateBackgroundColourFunction={updateBackgroundColour}
		/>
		
		<EraserButton
			initialEraserState={startingEraserState}
			updateEraserStateFunction={updateErasing}
		/>
	</>)
}

export default App





