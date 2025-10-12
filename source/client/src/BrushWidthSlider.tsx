import React, { useState } from 'react';

export type BrushWidthButtonProps = {
	initialWidth: string
	updateBrushWidthFunction: (width: number) => void
}

function BrushWidthSlider(props: BrushWidthButtonProps) {
	const [width, setWidth] = useState(props.initialWidth);
	
	const onWidthChange = (value: number) => {
		setWidth(value);
		props.updateBrushWidthFunction(value);
	}
	
    return (
    <>
		<input type="range" min="1" max="50" value={width} id="brushWidthInput"
			style={{
				position: "absolute",
				top: "10px",
				left: "10px",
				zIndex: 1
			}}
			onChange={e => onWidthChange(e.target.value)}
		/>
    </>
    )
}

export default BrushWidthSlider;
