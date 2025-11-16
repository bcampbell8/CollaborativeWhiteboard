import React, { useState } from 'react';


type EraserButtonProps = {
	initialEraserState: boolean
	updateEraserStateFunction: (state: boolean) => void
	style
}


function EraserButton(props: EraserButtonProps) {
	const [state, setState] = useState(props.initialEraserState);
	
	const onStateChange = (value: boolean) => {
		setState(value);
		props.updateEraserStateFunction(value);
	}
	
	return (<>
		<input type="checkbox" value={state} id="backgroundColourInput"
			style={props.style}
			onChange={e => onStateChange(e.target.value)}
		/>
    </>)
}

export default EraserButton;
