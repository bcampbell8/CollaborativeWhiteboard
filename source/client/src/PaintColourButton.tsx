import React, { useState } from 'react';

export type PaintColourButtonProps = {
	initialBrushColour: string
	updateBrushColour: (colour: string) => void
}

function PaintColourButton(props: PaintColourButtonProps) {
	const [colour, setColour] = useState(props.initialBrushColour);
	
	const onColourChange = (value: string) => {
		console.log("colour changed: " + value);
		props.updateBrushColour(value);
	}
	
    return (
    <>
		<input type="color" id="colourInput" value={colour}
			onChange={e => { let v = e.target.value; setColour(v); onColourChange(v) }}
		/>
    </>
    )
}

export default PaintColourButton;
