import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import Button from 'antd/es/button';

import styled from "styled-components";
import { Layout, Row, Col } from 'antd';
import { Redirect } from "react-router";
const { Header, Content, Footer } = Layout;

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

// const Header = styled.div`
//   height: 100px;
// `;
const Heading = styled.h1`
  font-color: white;
`;

// const ImgHolder = styled.div`
//   width: 100%;
//   justify-content: center
// `;
// const Wrap = styled.div`
//   display: flex;
// `;
// const Info = styled.div`
//   font-size: 20px;
//   flex: 1;
//   alignText: center;
// `;

export default function Occupied() {
  const { loading: gloading, data: gdata } = useQuery(GET_MST_GYM);
  const { loading, error, data } = useQuery(GET_WORKOUT, {
    skip: gloading,
    variables: { id: gdata ? gdata.gym.stations[0].occupiedBy.id : null }
  });
  if (gloading || loading) return <p>'Loading'</p>;
  if (error) return <Redirect to="/unoccupied" />;
  const workout = data.user.workouts[0];
  console.log(workout);

  function abort() {
    alert("This stations has been aborted.");
    return <Redirect to="/unoccupied" />;  
}
  function complete() {
    alert("Your exercise is now complete");
    return <Redirect to="/unoccupied" />;
  }
  return (
    <div>
      <Layout className="layout">
        <Header>
            <Heading style={{
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
            }}>
              Hey, {workout.workout.createdBy.name}!
            </Heading>
        </Header>
        <Content>
          <Col
          
          >
            <Row
              type='flex'
              justify='center'
            >
              <h2>Your workout today is: {workout.workout.name}</h2>
            </Row>
            <Row
              type='flex'
              justify='center'
            >
              <img
              src={workout.workout.exercises[0].exercise.instructions} 
              width='50%'
              />
            </Row>
            <Row
              type='flex'
              justify='center'
              align='middle'
            >
              <Col>
                <h3>
                  Current exercise: {workout.workout.exercises[0].exercise.name}
                </h3>
                <ul>
                  <li>Sets: {workout.workout.exercises[0].reps}</li>
                  <li>Reps: {workout.workout.exercises[0].sets}</li>
                  <li>Weight: {workout.workout.exercises[0].weight}lbs</li>
                </ul>
              </Col>
            </Row>
            </Col>
        </Content>
        <Footer
          style={{
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button type="primary" onClick={abort}>Abort</Button>
          <Button type="primary" onClick={complete}>Done</Button>
        </Footer>
      </Layout>
    </div>
  );
}

