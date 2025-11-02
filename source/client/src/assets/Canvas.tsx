import React, {useLayoutEffect, useState, useRef, type PointerEvent} from 'react';
//import {BrushWidthbuttonProps} from './BrushWidthSlider'

export type CanvasProps = {
	brushColour: string
	brushWidth: number
	backgroundColour: string
}

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

export default function Canvas(props: CanvasProps){
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D>(null);
    const [lineSegment, setLineSegment] = useState<LineSegment | null>(null);
    const [stroke, setStroke] = useState<Stroke | null>(null);
    const [strokeHistory, setStrokeHistory] = useState<Array<Stroke>>([]);
    const [socket, setSocket] = useState<WebSocket>();

    useLayoutEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const context = canvas.getContext("2d");
        contextRef.current = context;

        const newSocket = new WebSocket('ws://'+ window.location.hostname +':2210', 'echo-protocol');
        setSocket(newSocket);

        newSocket.onopen = () => {
            console.log('WebSocket connection established');
        };

        newSocket.onmessage = (event) => {
            // This is probably quite scuffed and there needs to be more done such as updating stroke history etc.
            //What about if my colour / thickness is different?
            if (contextRef.current){
                const message = JSON.parse(event.data);
                console.log("incoming:");
                console.log(message);
                // let tempWitdh = props.brushWidth;
                // let tempColour = props.brushColour;
                // props.brushColour = message.strokeColour;
                // props.brushWidth = message.strokeWidth;
                for(let segment of message.segments){
                    contextRef.current.beginPath();
                    contextRef.current.moveTo(segment.start[0], segment.start[1]);
                    contextRef.current.lineTo(segment.finish[0], segment.finish[1]);
                    contextRef.current.stroke();
                    contextRef.current.closePath();
                }
                // props.brushColour = tempColour;
                // props.brushWidth = tempWitdh;
            }
            
            
        };

        newSocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            newSocket.close();
        };

    }, []);

    const sendStroke = () => {
        if(stroke && socket && socket.readyState === WebSocket.OPEN){
            socket.send(JSON.stringify(stroke));
            console.log(JSON.stringify(stroke));
            console.log(typeof(JSON.stringify(stroke)));
            
        }
    }
	
    //Primary thing this does is begin recording a new stroke.
    //No segment should be created. Just a stroke initiated.
    const handlePointerDown = (e: PointerEvent) => {
        setIsDrawing(true);
        // Check if canvas has loaded. If it has, we can begin drawing.
        // Then load in all the current canvas settings for the stroke to be created and initiate stroke,
		// as well as initialising the first line segment.
        if (contextRef.current){ 
            contextRef.current.strokeStyle = props.brushColour;
            contextRef.current.lineWidth = props.brushWidth;
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
        sendStroke();
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




