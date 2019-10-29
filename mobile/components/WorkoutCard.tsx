import React from "react";

import styled from "styled-components";

import { TouchableOpacity, Text } from "react-native";

const Wrapper = styled(TouchableOpacity)`
  padding: 20px;
  background: #bff1ee;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.16);
  border-radius: 12px;
  margin: 20px;
`;

const Title = styled(Text)`
  font-size: 20px;
`;

const Created = styled(Text)`
  font-size: 14px;
  color: #666666;
`;

const Description = styled(Text)`
  font-size: 16px;
`;

const WorkoutCard: React.SFC<any> = (props: any): JSX.Element => {
  const { workout } = props;

  const onPress = () => {
    props.navigation.navigate(`WorkoutDetails`, {
      data: workout
    });
  };

  return (
    <Wrapper onPress={onPress}>
      <Title>{workout.workout.name}</Title>
      <Created>By {workout.workout.createdBy.name}</Created>
      <Description>{workout.workout.description}</Description>
    </Wrapper>
  );
};

export { WorkoutCard };
