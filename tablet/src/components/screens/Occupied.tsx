import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import styled from "styled-components";

const GET_WORKOUT = gql`
  query getUser($id: String!) {
    user(id: $id) {
      workouts {
        inProgress
        workout {
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
    }
  }
`;
const GET_MST_GYM = gql`
  {
    gym(id: "Ol0462y0TQTIv22TPAUA") {
      stations {
        occupiedBy {
          id
        }
      }
    }
  }
`;

const Header = styled.div`
  height: 100px;
`;
const Heading = styled.h1``;

const ImgHolder = styled.div`
  width: 40%;
`;
const Wrap = styled.div`
  display: flex;
`;
const Info = styled.div`
  font-size: 20px;
  flex: 1;
`;
const Img = styled.img`
  width: 100%;
`;

export default function Occupied() {
  const { loading: gloading, data: gdata } = useQuery(GET_MST_GYM);
  const { loading, error, data } = useQuery(GET_WORKOUT, {
    skip: gloading,
    variables: { id: gdata ? gdata.gym.stations[0].occupiedBy.id : null }
  });
  if (gloading || loading) return <p>'Loading'</p>;
  if (error) return <p>'error'</p>;
  const workout = data.user.workouts[0];
  console.log(workout);

  function abort() {
    alert("This stations has been aborted.");
    // Redirect to unoccupied here
  }
  function complete() {
    alert("Your exercise is now complete");
  }
  return (
    <div>
      <Header>
        <Heading>Hey, {workout.workout.createdBy.name}!</Heading>
        <h2>Your workout today is: {workout.workout.name}</h2>
      </Header>
      <Wrap>
        <ImgHolder>
          <Img src={workout.workout.exercises[0].exercise.instructions} />
        </ImgHolder>
        <Info>
          <h3>
            Current exercise: {workout.workout.exercises[0].exercise.name}
          </h3>
          <ul>
            <li>Sets: {workout.workout.exercises[0].reps}</li>
            <li>Reps: {workout.workout.exercises[0].sets}</li>
            <li>Weight: {workout.workout.exercises[0].weight}lbs</li>
          </ul>
          <button onClick={abort}>Abort</button>
          <button onClick={complete}>Done</button>
        </Info>
      </Wrap>
    </div>
  );
}

