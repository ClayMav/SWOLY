import React from "react";
import { Container, Header, Content, Text } from "native-base";
import { View, FlatList, TouchableOpacity } from "react-native";
import styled, { AnyStyledComponent } from "styled-components";

const ListItem: AnyStyledComponent = styled(View)`
  background: red;
`;

const WorkoutDetailsScreen: (props: any) => JSX.Element = (
  props: any
): JSX.Element => {
  const { data }: any = props.navigation.state.params;
  console.log(data);

  const renderRow: ({ item }: any) => JSX.Element = ({
    item
  }: any): JSX.Element => {
    console.log(item);
    const { exercise, reps, sets, isTimed }: any = item;
    return (
      <ListItem>
        <Text>{exercise.name}</Text>
        <Text>{isTimed ? `${sets} seconds` : `${reps} X ${sets}`}</Text>
      </ListItem>
    );
  };
  return (
    <Container>
      <Content>
        <Text>{data.name}</Text>
        <Text>{data.timeStart.toString()}</Text>
        <FlatList
          data={data.workoutExercises}
          renderItem={renderRow}
          keyExtractor={item => item.exercise.name}
        />
      </Content>
    </Container>
  );
};

export { WorkoutDetailsScreen };
