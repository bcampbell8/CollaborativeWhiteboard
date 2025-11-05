import React, { useState, useLayoutEffect, useRef, type PointerEvent } from 'react';
import PaintColourButton from './PaintColourButton.tsx';
import BrushWidthSlider from './BrushWidthSlider.tsx';
import BackgroundColourButton from './BackgroundColourButton.tsx';
import EraserButton from './EraserButton.tsx';

export type CanvasProps = {
	sendStroke: (stroke: Stroke) => void
	recievedStroke: Stroke
}

const startingBrushColour = "#000000";
const startingBrushWidth = 5;
const startingBackgroundColour = "#F0F0F0";
const startingEraserState = false;


export type Stroke = {
    strokeColour: string,
    strokeWidth: number,
    segments: Array<LineSegment | null>
    //Add extra fields for other information the stroke needs to keep track of as necessary
    //Add stroke type to differentiate between line, eraser, etc.
}

//This will compose a stroke. 
export type LineSegment = {
    start: Point | null,
    finish: Point | null
}

//Defines a 2D point on the canvas.
export type Point = [number, number];

export default function Canvas(props: CanvasProps) {
	
	const [globalBrushColour, updateBrushColour] = useState(startingBrushColour);
	const [globalBrushWidth, updateBrushWidth] = useState(startingBrushWidth);
	const [globalBackgroundColour, updateBackgroundColour] = useState(startingBackgroundColour);
	const [globalEraserState, updateEraserState] = useState(startingEraserState);
	
	
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D>(null);
    const [lineSegment, setLineSegment] = useState<LineSegment | null>(null);
    const [stroke, setStroke] = useState<Stroke | null>(null);
    const [strokeHistory, setStrokeHistory] = useState<Array<Stroke>>([]);
	
	
	function drawStroke(stroke: Stroke) {
		console.log("drawing: " + JSON.stringify(stroke));
		if (JSON.stringify(stroke) == "{}") {
			return;
		}
		if (contextRef.current) {
			console.log("incoming:");
			console.log(stroke);
			// let tempWitdh = props.brushWidth;
			// let tempColour = props.brushColour;
			// props.brushColour = stroke.strokeColour;
			// props.brushWidth = stroke.strokeWidth;
			for (let segment of stroke.segments) {
				contextRef.current.beginPath();
				contextRef.current.moveTo(segment.start[0], segment.start[1]);
				contextRef.current.lineTo(segment.finish[0], segment.finish[1]);
				contextRef.current.stroke();
				contextRef.current.closePath();
			}
			// props.brushColour = tempColour;
			// props.brushWidth = tempWitdh;
		}
	}
	
	
	useLayoutEffect(() => {
		const canvas = canvasRef.current as HTMLCanvasElement;
        const context = canvas.getContext("2d");
        contextRef.current = context;
		
        //Updates canvas whenevr a stroke is received
		drawStroke(props.recievedStroke);

        //Need to include the props here in dependency array
	}, [props.recievedStroke]);
	
	
    //Primary thing this does is begin recording a new stroke.
    //No segment should be created. Just a stroke initiated.
    const handlePointerDown = (e: PointerEvent) => {
        setIsDrawing(true);
        // Check if canvas has loaded. If it has, we can begin drawing.
        // Then load in all the current canvas settings for the stroke to be created and initiate stroke,
		// as well as initialising the first line segment.
        if (contextRef.current){ 
            contextRef.current.strokeStyle = globalBrushColour;
            contextRef.current.lineWidth = globalBrushWidth;
            contextRef.current.beginPath();
            contextRef.current.moveTo(e.clientX, e.clientY);
            let newLineSegment: LineSegment = {start: [e.clientX, e.clientY], finish: null}
            setLineSegment(newLineSegment);
            let newStroke: Stroke = {
                strokeColour: contextRef.current.strokeStyle,
                strokeWidth: contextRef.current.lineWidth,
                segments: new Array<LineSegment>
            }
            setStroke(newStroke);
        }
    }

    //Needs to create a new LineSegment each time mouse is moved.
    const handlePointerMove = (e: PointerEvent) => {
        if (!isDrawing){
            return;
        }
        if (contextRef.current){
            if (lineSegment && lineSegment.start){
                contextRef.current.moveTo(lineSegment.start[0], lineSegment.start[1]);
            }
            
            contextRef.current.lineTo(e.clientX, e.clientY);
            contextRef.current.stroke();
            //Close line segment
            let oldLineSegment = lineSegment;
            if (!oldLineSegment){
                return;
            }
            oldLineSegment.finish = [e.clientX, e.clientY];
            contextRef.current.closePath();
            stroke?.segments.push(oldLineSegment);

            //Begin new line segment
            contextRef.current.beginPath();
            contextRef.current.moveTo(e.clientX,e.clientY);
            let newLineSegment: LineSegment = {start: [e.clientX, e.clientY], finish: null}
            setLineSegment(newLineSegment);
        }
    }
    
    //Need to close current line segment, add it, then update stroke history.
    const handlePointerUp = (e: PointerEvent) => {
        setIsDrawing(false);
        if (contextRef.current){
            contextRef.current.closePath();
            if (!lineSegment){
                return;
            }
            let oldLineSegment = lineSegment;
            
            oldLineSegment.finish = [e.clientX, e.clientY];
            setLineSegment(oldLineSegment);
            stroke?.segments.push(lineSegment);
        }
        let updatedStrokeHistory: Array<Stroke> = strokeHistory;
        if (!stroke){
            return;
        }
        updatedStrokeHistory.push(stroke);
        setStrokeHistory(updatedStrokeHistory);
        console.log(strokeHistory);
        props.sendStroke(stroke);
    }
	
	
	const updateErasing = () => {
		updateEraserState();
	};
    
    return (
    <>
		<BrushWidthSlider
			initialWidth={globalBrushWidth}
			updateBrushWidthFunction={updateBrushWidth}
		/>
		
		<PaintColourButton
			initialBrushColour={globalBrushColour}
			updateBrushColourFunction={updateBrushColour}
		/>
		
		<BackgroundColourButton
			initialBackgroundColour={globalBackgroundColour}
			updateBackgroundColourFunction={updateBackgroundColour}
		/>
		
		<EraserButton
			initialEraserState={globalEraserState}
			updateEraserStateFunction={updateErasing}
		/>
		
		
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




