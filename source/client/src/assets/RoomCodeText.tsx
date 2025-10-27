import React, { useState } from 'react';


type RoomCodeTextProps = {
	text: string
}


function RoomCodeText(props: RoomCodeTextProps) {
	
	return (<>
		<div>
			<p style={{
				position: "absolute",
				bottom: "10px",
				left: "20px",
				zIndex: 1
			}}>
			<mark style={{
				backgroundColor: "black",
				color: "white"
			}}>{props.text}</mark></p>
		</div>
    </>)
}

export default RoomCodeText;
