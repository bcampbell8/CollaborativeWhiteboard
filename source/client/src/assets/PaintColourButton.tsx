import React, { useState } from 'react';

export type PaintColourButtonProps = {
	initialBrushColour: string
	updateBrushColourFunction: (colour: string) => void
}

function PaintColourButton(props: PaintColourButtonProps) {
	const [colour, setColour] = useState(props.initialBrushColour);
	
	const onColourChange = (value: string) => {
		setColour(value);
		props.updateBrushColourFunction(value);
	}
	
    return (
    <>
		<input type="color" id="brushColourInput" value={colour}
			style={{
				position: "absolute",
				top: "45px",
				left: "10px",
				zIndex: 1
			}}
			onChange={e => onColourChange(e.target.value)}
		/>
    </>
    )
}

export default PaintColourButton;
