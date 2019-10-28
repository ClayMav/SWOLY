import React from "react";
import { Container, Content, Text } from "native-base";
import { FlatList, TouchableOpacity } from "react-native";
import styled, { AnyStyledComponent } from "styled-components";

const data = [
  {
    id: "sdfasdgadnajsdfafdasf",
    timeStart: new Date(),
    timeEnd: undefined,
    currentExercise: 0,
    gym: undefined,
    name: "Power Legs",
    description: "Exhaust your legs with some casual lifting and cardio",
    target: "normies",
    workoutExercises: [
      {
        exercise: {
          name: "Back Squats"
        },
        reps: 5,
        sets: 5,
        isTimed: false
      },
      {
        exercise: {
          name: "Leg Press"
        },
        reps: 10,
        sets: 3,
        isTimed: false
      },
      {
        exercise: {
          name: "Weighted Lunges"
        },
        reps: 10,
        sets: 3,
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
  height: 80px;
  padding: 30px;
  flex-direction: column;
  justify-content: center;
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
    const { name, timeStart }: any = item;
    return (
      <ListItem onPress={() => onPress(index)}>
        <Text>{name}</Text>
        <Text>{timeStart.toString()}</Text>
      </ListItem>
    );
  };
  return (
    <Container>
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
