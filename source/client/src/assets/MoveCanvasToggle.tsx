import React, { useState } from 'react';


type MoveCanvasToggleProps = {
	updateMovingCanvasFunction: (value: boolean) => void
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
			style={{
				position: "absolute",
				top: "150px",
				left: "10px",
				zIndex: 1
			}}
			onChange={onStateChange}
		/>
    </>)
}

export default MoveCanvasToggle;
