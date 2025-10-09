import React, {useLayoutEffect, useState, useRef, type PointerEvent} from 'react';

export function Canvas(){
    const [isDrawing, setIsDrawing] = useState(false);
    //const [elements, setElements] = useState([]); Consider element list that holds strokes.
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
            contextRef.current.beginPath();
            contextRef.current.moveTo(e.clientX, e.clientY);
        }
        
    }
    const handlePointerUp = (e: PointerEvent) => {
        setIsDrawing(false);
        if (contextRef.current){
            contextRef.current.closePath()
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
    
    return (
    <>
        <canvas id="canvas" 
                style={{backgroundColor: "blue"}} 
                width={window.innerWidth} 
                height={window.innerHeight}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerMove={handlePointerMove}
                ref={canvasRef}/>
    </>
    )
}