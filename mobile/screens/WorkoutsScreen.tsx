import React, { useState } from "react";
import { Container, Header, Content, Text } from "native-base";
import { View, FlatList, TouchableOpacity } from "react-native";
import styled, { AnyStyledComponent } from "styled-components";

const data = [
  {
    id: "sdfasdgadnajsdfafdasf",
    timeStart: new Date(),
    timeEnd: undefined,
    currentExercise: 0,
    gym: undefined,
    name: "Test",
    description: "Testing stuff",
    target: "normies",
    workoutExercises: [
      {
        exercise: {
          name: "Bench Press"
        },
        reps: 5,
        sets: 5,
        isTimed: false
      }
    ],
    dateCreated: new Date(),
    creator: {
      name: "Steve"
    }
  }
];

const ListItem: AnyStyledComponent = styled(TouchableOpacity)`
  background: black;
`;

const WorkoutsScreen: React.SFC<any> = (props: any): JSX.Element => {
  const onPress: (x: number) => void = (index: number): void => {
    props.navigation.navigate(`WorkoutDetails`, {
      data: data[index]
    });
  };

  const renderRow: ({ item, index }: any) => JSX.Element = ({
    item,
    index
  }: any): JSX.Element => {
    const { name, timeStart, gym, id }: any = item;
    return (
      <ListItem onPress={() => onPress(index)}>
        <Text>{name}</Text>
        <Text>{timeStart.toString()}</Text>
      </ListItem>
    );
  };
  return (
    <Container>
      <Header />
      <Content>
        <FlatList
          data={data}
          renderItem={renderRow}
          keyExtractor={item => item.id}
        />
      </Content>
    </Container>
  );
};

export { WorkoutsScreen };
