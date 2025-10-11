import React, { useState } from 'react';

export type BrushWidthButtonProps = {
	initialWidth: string
	updateBrushWidthFunction: (width: number) => void
}

function BrushWidthSlider(props: BrushWidthButtonProps) {
	const [width, setWidth] = useState(props.initialWidth);
	
	const onWidthChange = (value: string) => {
		props.updateBrushWidthFunction(value);
	}
	
    return (
    <>
		<input type="range" min="1" max="100" value={width} id="brushWidthInput"
			onChange={e => { let v = e.target.value; setWidth(v); onWidthChange(v) }}
		/>
    </>
    )
}

export default BrushWidthSlider;
