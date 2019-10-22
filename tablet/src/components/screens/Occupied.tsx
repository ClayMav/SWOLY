import React from 'react';

export default function Occupied(this: any) {
    function abort() {
        alert("This stations has been aborted.");
        // Redirect to unoccupied here
    }
    function getData() {
        fetch('https://us-central1-swoly-252721.cloudfunctions.net/gql-test ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `{
                    gyms {
                        name
                        stations {
                          name
                          exercisesAllowed {
                            name
                          }
                          occupiedBy {
                            name
                          }
                        }
                    }
                }`
            })
        })
        .then(r => r.json())
        .then(data => {
            data.data.gyms.forEach((gym: any) => {
                console.log(gym.name, ": \t", gym.stations)
            })
        })
        // Return values back to the calling screen and use that there to display values
    }
    return(
        <div>
            <h1>Hello from the occupied view</h1>
            <h2>This is screen is for showing the user/gym that the current station is taken</h2>
            <button 
                onClick={abort}>Abort
            </button>
            <button
                onClick={getData}
            >Get Data
            </button>
        </div>
    )
}