import React, { useEffect, useGlobal } from "reactn";
import styled from "styled-components";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import * as Location from "expo-location";

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

const DATA = [
  {
    description: "705 W 10th St, Rolla, MO 65409",
    id: "sdasdgadskfnkasdf",
    location: { latitude: 37.951124, longitude: -91.778133 },
    name: "Missouri S&T Gym",
    smart: 100
  }
];

const StartScreen = props => {
  const { loading, error, data } = useQuery(GET_GYMS);
  const [location, setLocation] = useGlobal("location");

  useEffect(() => {
    const getLocation = async () => {
      Location.requestPermissionsAsync()
        .then(async () => {
          setLocation(await Location.getCurrentPositionAsync());
        })
        .catch(() => {
          console.log("Failure to get permission");
        });
    };

    getLocation();
  }, []);

  if (loading || location === undefined) {
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
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export { StartScreen };
