import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import * as Location from "expo-location";

const GET_GYMS = gql`
  {
    gyms {
      name
      location {
        latitude
        longitude
      }
    }
  }
`;

const DATA = [
  {
    description: "705 W 10th St, Rolla, MO 65409",
    id: "sdasdgadskfnkasdf",
    location: { latitude: 37.951124, longitude: -91.778133 },
    name: "Missouri S&T Gym",
    smart: 100
  },
  {
    description: "705 W 10th St, Rolla, MO 65409",
    id: "sdjagdglhadflkdjf",
    location: { latitude: 2, longitude: 3 },
    name: "Planet Fitness",
    smart: 65
  },
  {
    id: "askdfjasopgjajdfkalsjdfkl",
    name: "Gold's Gym",
    location: { latitude: 2, longitude: 3 },
    description: "705 W 10th St, Rolla, MO 65409",
    smart: 100
  },
  {
    id: "afklsdjflajsldfjkl",
    name: "Jim's Crossfit",
    location: { latitude: 2, longitude: 3 },
    description: "705 W 10th St, Rolla, MO 65409",
    smart: 43
  },
  {
    id: "asdjfkasdg",
    name: "Bob's",
    location: { latitude: 2, longitude: 3 },
    description: "705 W 10th St, Rolla, MO 65409",
    smart: 92
  }
];

const StartScreen = props => {
  const { loading, error, data } = useQuery(GET_GYMS);
  const [location, setLocation] = useState<Location.LocationData | undefined>(
    undefined
  );

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

  if (loading) {
    return <Text>"Testing"</Text>;
  } else if (error) {
    return <Text>{error.toString()}</Text>;
  }
  console.log(data);

  const renderRow: any = ({ item, index }: any) => {
    const navTime = () => {
      props.navigation.navigate(`Map`, {
        data: data.gyms[index]
      });
    };
    return (
      <TouchableOpacity onPress={navTime}>
        <Text>
          {item.name} - {item.smart}
        </Text>
        <Text>1.2 miles away - Open Now - 24h</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text>SWOLY</Text>
      <Text>Image Here</Text>
      <Text>
        star SWOLY is your personal fitness assitant, workouts are for working
        out, let us do the mental gymnastics for you
        {JSON.stringify(location)}
      </Text>
      {data && data.gyms && location ? (
        <FlatList data={data.gyms} renderItem={renderRow} />
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
};

export { StartScreen };
