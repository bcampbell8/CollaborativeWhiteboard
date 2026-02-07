import React, {useState} from 'react';
import type Room from '../../../server/IWDB.ts'


export type hostButtonProps = {
    address: string
}

function HostButton(props: hostButtonProps){
    const [room, setRoom] = useState<Room>();


    async function handleClick(){
        try {
            const response = await fetch('http://192.168.0.2:2211/create');
            const incRoom = await response.json();
            console.log(incRoom);
            setRoom(incRoom);
            window.location.href = `/participate/${encodeURIComponent(incRoom._id)}`
        } catch (error) {
            console.log('Failed to create room. Error: ' + error);
        }<
    }

    return(
        <>
        <button onClick={handleClick}>Host Room</button>
        </>
    )

}
export default HostButton;
