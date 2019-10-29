import React, { useEffect, useGlobal } from "reactn";

import styled from "styled-components";

import { SafeAreaView, Text, View } from "react-native";
import { WorkoutCard } from "../components/WorkoutCard";
import { Loading } from "../components/Loading";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_USER = gql`
  query {
    user(id: "GHpwywOdqQlVF8B7BGjH") {
      name
      workouts {
        inProgress
        timeStart
        workout {
          name
          description
          target
          createdTime
          createdBy {
            name
          }
          exercises {
            reps
            sets
            weight
            exercise {
              instructions
              muscleGroups
              name
            }
          }
        }
      }
    }
  }
`;

const Wrapper = styled(View)`
  padding: 30px;
`;

const Name = styled(Text)`
  margin-top: 15px;
  font-size: 34px;
  font-weight: bold;
`;

const GymInfo = styled(Text)`
  margin-top: 10px;
  font-size: 22px;
`;

const HomeScreen = (props: any): JSX.Element => {
  const [user, setUser] = useGlobal("user");
  const { loading, error, data } = useQuery(GET_USER);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (error) {
      alert(error.toString());
    }
    setUser(data.user);
  }, [loading]);

  if (user) {
    const bestWorkout = user.workouts[0];
    return (
      <SafeAreaView>
        <Wrapper>
          <Name>Hey{user ? ", " + user.name.replace(/\s.*/, "") : ""}</Name>
          <GymInfo>Missouri S&T Gym is 65% full and open</GymInfo>
        </Wrapper>
        <WorkoutCard navigation={props.navigation} workout={bestWorkout} />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <Loading />
      </SafeAreaView>
    );
  }
};

export { HomeScreen };
