import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks'
import { userInfo } from 'os';

const GET_GYMS = gql`
  {
    gyms {
      id
      name
      address
      location {
        latitude
        longitude
      }
    }
  }
`;

export default function Occupied() {
    const { loading, error, data } = useQuery(GET_GYMS);
    if(loading)
        return <p>'Loading'</p>;
    if(error)
        return <p>'error'</p>;
    console.log(data.gyms);

    function abort() {
        alert("This stations has been aborted.");
        // Redirect to unoccupied here
    }
    return(
        <div>
            <h1>Hello from the occupied view</h1>
            <h2>This is screen is for showing the user/gym that the current station is taken</h2>
            <button 
                onClick={abort}>Abort
            </button>
        </div>
    )
}