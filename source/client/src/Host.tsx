import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import './style.css'
import Canvas from './assets/Canvas.tsx';
import PaintColourButton from './assets/PaintColourButton.tsx';
import BrushWidthSlider from './assets/BrushWidthSlider.tsx';
import BackgroundColourButton from './assets/BackgroundColourButton.tsx';
import EraserButton from './assets/EraserButton.tsx';
import RoomCodeText from './assets/RoomCodeText.tsx';


const startingBrushColour = "#000000";
const startingBrushWidth = 5;
const startingBackgroundColour = "#F0F0F0";
const startingEraserState = false;



async function Host() {
	
	async function getRoomCode() {
		const code = await fetch("http://" + window.location.hostname + ":2211/joinroom");
	}
	
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
		
		
		
		<RoomCodeText text={await getRoomCode()} />
	</>)
}

export default Host;





