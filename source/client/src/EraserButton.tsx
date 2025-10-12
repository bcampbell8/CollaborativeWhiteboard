import React, { useState } from 'react';


type EraserButtonProps = {
	initialEraserState: boolean
	updateEraserStateFunction: (state: boolean) => void
}


function EraserButton(props: EraserButtonProps) {
	const [state, setState] = useState(props.initialEraserState);
	
	const onStateChange = (value: boolean) => {
		setState(value);
		props.updateEraserStateFunction(value);
	}
	
	return (<>
		<input type="checkbox" value={state} id="backgroundColourInput"
			style={{
				position: "absolute",
				top: "125px",
				left: "10px",
				zIndex: 1
			}}
			onChange={e => onStateChange(e.target.value)}
		/>
    </>)
}

export default EraserButton;
