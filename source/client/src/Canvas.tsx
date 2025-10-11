import React, {useLayoutEffect, useState, useRef, type PointerEvent} from 'react';


export type CanvasProps = {
	brushColour: string
	brushWidth: number
}

export default function Canvas(props: CanvasProps){
    const [isDrawing, setIsDrawing] = useState(false);
    //const [elements, setElements] = useState([]); Consider element list that holds strokes
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D>(null);
    
    useLayoutEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const context = canvas.getContext("2d");
        contextRef.current = context;
    }, []);
	
    const handlePointerDown = (e: PointerEvent) => {
        setIsDrawing(true);
        if (contextRef.current){
            contextRef.current.strokeStyle = props.brushColour;
            contextRef.current.lineWidth = props.brushWidth;
            contextRef.current.beginPath();
            contextRef.current.moveTo(e.clientX, e.clientY);
        }
    }
    const handlePointerMove = (e: PointerEvent) => {
        if (!isDrawing){
            return;
        }
        if (contextRef.current){
            contextRef.current.lineTo(e.clientX, e.clientY);
            contextRef.current.stroke();
        }
    }
    const handlePointerUp = (/*e: PointerEvent*/) => {
        setIsDrawing(false);
        if (contextRef.current){
            contextRef.current.closePath();
        }
    }
    
    return (
    <>
        <canvas id="canvas" 
			width={window.innerWidth} 
			height={window.innerHeight}
			onPointerDown={handlePointerDown}
			onPointerUp={handlePointerUp}
			onPointerMove={handlePointerMove}
			ref={canvasRef}
		/>
    </>
    )
}




