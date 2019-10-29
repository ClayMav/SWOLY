import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks'
import { userInfo } from 'os';

// const GET_GYMS = gql`
//   {
//     gyms {
//       id
//       name
//       address
//       location {
//         latitude
//         longitude
//       }
//     }
//   }
// `;

const GET_WORKOUT = gql`
{
    workout(id: "z4CsysmySGGT0AsblAg8") {
        name
        createdBy {
            name
        }
        exercises {
            exercise {
                name
                instructions
            }
            reps
            sets
            weight
        }
    }
}      
`;

export default function Occupied() {
    const { loading, error, data } = useQuery(GET_WORKOUT);
    if(loading)
        return <p>'Loading'</p>;
    if(error)
        return <p>'error'</p>;
    console.log(data.exercises);

    function abort() {
        alert("This stations has been aborted.");
        // Redirect to unoccupied here
    }
    function complete() {
        alert("Your exercise is now complete");
    }
    return(
        <div>
            <h1>Hello {data.workout.createdBy.name}!</h1>
            <h2>Your workout today is: {data.workout.name}</h2>
            <h3>Current exercise: {data.workout.exercises[0].exercise.name}</h3>
            <img src={data.workout.exercises[0].exercise.instructions} />
            <ul>
                <li>Sets: {data.workout.exercises[0].reps}</li>
                <li>Reps: {data.workout.exercises[0].sets}</li>
                <li>Weight: {data.workout.exercises[0].weight}lbs</li>
            </ul>
            <button 
                onClick={abort}>Abort
            </button>
            <button onClick={complete}>Done</button>
        </div>
    )
}