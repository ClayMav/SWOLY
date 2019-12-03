import React, {  useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import Button from 'antd/es/button';

import styled from "styled-components";
import { Layout, Row, Col } from 'antd';
import { withRouter, Redirect } from "react-router";
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
        name
        reserved
      }
    }
  }
`;

const UPDATE_BENCH = gql`
  mutation {
    demoTablet(done: false)
  }
`;

const UPDATE_SQUAT = gql`
  mutation {
    demoTablet(done: true)
  }
`;
// const Header = styled.div`
//   height: 100px;
// `;
const Heading = styled.h1`
  font-color: white;
`;

export default function Occupied() {
  const { loading: gloading, data: gdata } = useQuery(GET_MST_GYM);
  const { loading, error, data } = useQuery(GET_WORKOUT, {
    skip: gloading,
    variables: { id: gdata ? gdata.gym.stations[1].occupiedBy.id : null }
  });
  if (gloading || loading) return <p>'Loading'</p>;
  console.log(gdata.gym.stations)
  if (gdata && gdata.gym.stations[1].reserved === false) { 
    return <Redirect to="/unoccupied" />; 
  }
  const workout = data.user.workouts[0];
  console.log(workout);

  function abort() {
    window.location.reload()
  }

  async function complete() {
    fetch('https://us-central1-swoly-252721.cloudfunctions.net/gql-test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `mutation {
              demoTablet(done: true)
            }`
        })
    })
    window.location.reload(true);
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
              Station: {gdata.gym.stations[1].name}
            </Heading>
        </Header>
        <Content>
          <Col>
            <Row
              type='flex'
              justify='center'
            >
              <h1>Hey, {workout.workout.createdBy.name}!</h1>
            </Row>
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

