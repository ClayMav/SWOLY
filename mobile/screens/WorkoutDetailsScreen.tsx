import React from "react";

import { Button, View, FlatList, SafeAreaView, Text } from "react-native";

import styled, { AnyStyledComponent } from "styled-components";

const ListItem: AnyStyledComponent = styled(View)`
  height: 80px;
  padding: 30px;
`;

const WorkoutInfo = styled(View)`
  padding: 30px;
`;
const WorkoutTitle = styled(Text)`
  font-size: 26px;
  font-weight: bold;
`;
const WorkoutAdditionalInfo = styled(Text)`
  margin-top: 10px;
  font-size: 14px;
  margin-bottom: 10px;
`;
const WorkoutDescription = styled(Text)`
  font-size: 18px;
`;

const WorkoutDetailsScreen: (props: any) => JSX.Element = (
  props: any
): JSX.Element => {
  const { data }: any = props.navigation.state.params;
  console.log(data);

  const onPress = () => {
    // start the workout
  };

  const renderRow: ({ item }: any) => JSX.Element = ({
    item
  }: any): JSX.Element => {
    console.log(item);
    const { exercise, reps, sets }: any = item;
    return (
      <ListItem>
        <Text>{exercise.name}</Text>
        <Text>{`${reps} X ${sets}`}</Text>
      </ListItem>
    );
  };
  return (
    <SafeAreaView>
      <WorkoutInfo>
        <WorkoutTitle>{data.workout.name}</WorkoutTitle>
        <WorkoutAdditionalInfo>{`Made by ${
          data.workout.createdBy.name
        } on ${data.workout.createdTime.toString()}`}</WorkoutAdditionalInfo>
        <WorkoutDescription>
          {data.workout.description + "\n"}
        </WorkoutDescription>
        <Button title="Start Workout" onPress={onPress} />
        <Text>Exercises:</Text>
      </WorkoutInfo>
      <FlatList
        data={data.workout.exercises}
        renderItem={renderRow}
        keyExtractor={(item: any): string => item.exercise.name}
      />
    </SafeAreaView>
  );
};

export { WorkoutDetailsScreen };
