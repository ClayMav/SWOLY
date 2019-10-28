import React from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from "react-native";

const GET_GYMS = gql`
  {
    gyms {
      id
      name
      address
      location {
        latitude
        longitude
      }
    }
  }
`;

const TitleBox = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30%;
  width: 100%;
`;
const Title = styled(Text)`
  font-size: 36px;
  font-weight: bold;
`;

const InfoBox = styled(View)`
  padding: 30px;
`;
const Info = styled(Text)`
  font-size: 16px;
`;

const GymButton = styled(TouchableOpacity)`
  border-top-width: 1px;
  border-top-color: lightgray;
  height: 80px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const GymName = styled(Text)`
  font-weight: bold;
  font-size: 15px;
`;
const GymInfo = styled(Text)`
  font-size: 14px;
`;

const StartScreen: React.FC<any> = (props: any): JSX.Element => {
  const { loading, error, data } = useQuery(GET_GYMS);

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  } else if (error) {
    return (
      <SafeAreaView>
        <Text>{error.toString()}</Text>
      </SafeAreaView>
    );
  }

  const renderRow: any = ({ item, index }: any): JSX.Element => {
    const navTime = () => {
      props.navigation.navigate(`Map`, {
        data: data.gyms[index]
      });
    };
    return (
      <GymButton onPress={navTime}>
        <GymName>{item.name}</GymName>
        <GymInfo>1.2 miles away - Open Now - 24h</GymInfo>
      </GymButton>
    );
  };

  return (
    <SafeAreaView>
      <TitleBox>
        <Title>SWOLY</Title>
      </TitleBox>
      <InfoBox>
        <Info>
          SWOLY is your personal fitness assitant, workouts are for working out,
          let us do the mental gymnastics for you.{"\n\n"}
          Choose a GYM to get started:
        </Info>
      </InfoBox>
      <FlatList
        data={data.gyms}
        renderItem={renderRow}
        keyExtractor={(item: any): string => item.id}
      />
    </SafeAreaView>
  );
};

export { StartScreen };
