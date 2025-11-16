import React, { useState } from 'react';


type MoveCanvasToggleProps = {
	updateMovingCanvasFunction: (value: boolean) => void
	style
}


function MoveCanvasToggle(props: MoveCanvasToggleProps) {
	
	const [inMotion, setInMotion] = useState(true);
	
	const onStateChange = () => {
		setInMotion(!inMotion);
		// console.log(inMotion);
		props.updateMovingCanvasFunction(inMotion);
	}
	
	
	return (<>
		<input type="checkbox"
			id="movecanvastogglebutton"
			value={inMotion}
			onChange={onStateChange}
			style={props.style}
		/>
    </>)
}

export default MoveCanvasToggle;
