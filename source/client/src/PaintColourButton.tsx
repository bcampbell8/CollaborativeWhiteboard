import React, { useState } from 'react';

export type PaintColourButtonProps = {
	initialBrushColour: string
	updateBrushColourFunction: (colour: string) => void
}

function PaintColourButton(props: PaintColourButtonProps) {
	const [colour, setColour] = useState(props.initialBrushColour);
	
	const onColourChange = (value: string) => {
		props.updateBrushColourFunction(value);
	}
	
    return (
    <>
		<input type="color" id="brushColourInput" value={colour}
			onChange={e => { let v = e.target.value; setColour(v); onColourChange(v) }}
		/>
    </>
    )
}

export default PaintColourButton;
