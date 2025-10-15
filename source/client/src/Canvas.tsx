import React, {useLayoutEffect, useState, useRef, type PointerEvent} from 'react';


export type CanvasProps = {
	brushColour: string
	brushWidth: number
	backgroundColour: string
}

export type Line = Array<Point>;
export type Point = [number, number];


export default function Canvas(props: CanvasProps){
    const [isDrawing, setIsDrawing] = useState(false);
    //const [elements, setElements] = useState([]); Consider element list that holds strokes
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D>(null);
    const [stroke, setStroke] = useState<Line>([]);
    const [lineHistory, setLineHistory] = useState<Array<Line>>([]);

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
            let newLine: Line = [];
            newLine.push([e.clientX, e.clientY]);
            setStroke(newLine);
        }
    }
    const handlePointerMove = (e: PointerEvent) => {
        if (!isDrawing){
            return;
        }
        if (contextRef.current){
            contextRef.current.lineTo(e.clientX, e.clientY);
            contextRef.current.stroke();
            let newLine: Line  = stroke;
            newLine.push([e.clientX, e.clientY]);
            setStroke(newLine);
        }
    }
    const handlePointerUp = (/*e: PointerEvent*/) => {
        setIsDrawing(false);
        if (contextRef.current){
            contextRef.current.closePath();
        }
        let updatedLineHistory: Array<Line> = lineHistory;
        updatedLineHistory.push(stroke);
        setLineHistory(updatedLineHistory);
        console.log(lineHistory);
    }
    
    return (
    <>
        <canvas id="canvas" 
			width={window.innerWidth} 
			height={window.innerHeight}
			style={{
				width: "100%",
				height: "95%",
				background: props.backgroundColour
			}}
			onPointerDown={handlePointerDown}
			onPointerUp={handlePointerUp}
			onPointerMove={handlePointerMove}
			ref={canvasRef}
		/>
    </>
    )
}




