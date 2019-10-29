import React, { useGlobal } from "reactn";

import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Loading } from "../components/Loading";

import styled, { AnyStyledComponent } from "styled-components";

const ListItem: AnyStyledComponent = styled(TouchableOpacity)`
  height: 80px;
  padding: 30px;
  flex-direction: column;
  justify-content: center;
`;

const Wrapper = styled(View)`
  padding: 30px;
`;

const Name = styled(Text)`
  margin-top: 15px;
  font-size: 34px;
  font-weight: bold;
`;

const WorkoutsScreen: React.SFC<any> = (props: any): JSX.Element => {
  const [user] = useGlobal("user");

  if (!user) {
    return <Loading />;
  }

  const onPress: (x: number) => void = (index: number): void => {
    props.navigation.navigate(`WorkoutDetails`, {
      data: user.workouts[index]
    });
  };

  const renderRow: ({ item, index }: any) => JSX.Element = ({
    item,
    index
  }: any): JSX.Element => {
    const {
      workout: { name },
      timeStart
    }: any = item;
    return (
      <ListItem onPress={() => onPress(index)}>
        <Text>{name}</Text>
        <Text>{timeStart.toString()}</Text>
      </ListItem>
    );
  };
  return (
    <SafeAreaView>
      <Wrapper>
        <Name>Workouts</Name>
      </Wrapper>
      <FlatList
        data={user.workouts}
        renderItem={renderRow}
        keyExtractor={(item: any): string => item.id}
      />
    </SafeAreaView>
  );
};

export { WorkoutsScreen };
