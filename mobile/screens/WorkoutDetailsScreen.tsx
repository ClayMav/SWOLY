import React from "react";
import { View, FlatList, SafeAreaView, Text } from "react-native";
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
    <SafeAreaView>
      <WorkoutInfo>
        <WorkoutTitle>{data.name}</WorkoutTitle>
        <WorkoutAdditionalInfo>{`Made by ${
          data.creator.name
        } on ${data.timeStart.toString()}`}</WorkoutAdditionalInfo>
        <WorkoutDescription>{data.description + "\n"}</WorkoutDescription>
        <Text>Exercises:</Text>
      </WorkoutInfo>
      <FlatList
        data={data.workoutExercises}
        renderItem={renderRow}
        keyExtractor={(item: any): string => item.exercise.name}
      />
    </SafeAreaView>
  );
};

export { WorkoutDetailsScreen };
