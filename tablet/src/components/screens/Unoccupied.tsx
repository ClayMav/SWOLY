import React from 'react'


export default function Unoccupied(this: any) {
    function occupyStation () {
        alert("The station is now occupied")
        // Redirec to occupied, here
    }
    return (
        <div>
            <h1>Hello from the unoccupied view</h1>
            <h2>This is screen is for showing the user/gym that the current station is empty</h2>
            <div>
            <button 
                onClick={occupyStation}>Occupy</button>
            </div>
        </div>
    )
};
