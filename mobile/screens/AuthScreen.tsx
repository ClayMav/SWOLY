import React from "react";
import { Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";

const DATA = [
  {
    id: "sdasdgadskfnkasdf",
    name: "Missouri S&T Gym",
    location: { latitude: 2, longitude: 3 },
    smart: 100
  },
  {
    id: "sdjagdglhadflkdjf",
    name: "Planet Fitness",
    location: { latitude: 2, longitude: 3 },
    smart: 65
  },
  {
    id: "askdfjasopgjajdfkalsjdfkl",
    name: "Gold's Gym",
    location: { latitude: 2, longitude: 3 },
    smart: 100
  },
  {
    id: "afklsdjflajsldfjkl",
    name: "Jim's Crossfit",
    location: { latitude: 2, longitude: 3 },
    smart: 43
  },
  {
    id: "asdjfkasdg",
    name: "Bob's",
    location: { latitude: 2, longitude: 3 },
    smart: 92
  }
];

const AuthScreen: React.SFC<any> = (props: any): JSX.Element => {
  const renderRow: any = ({ item }: any) => {
    const navTime = () => {
      props.navigation.navigate("Map");
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
    <SafeAreaView>
      <Text>SWOLY</Text>
      <Text>Image Here</Text>
      <Text>
        star SWOLY is your personal fitness assitant, workouts are for working
        out, let us do the mental gymnastics for you
      </Text>
      <FlatList
        data={DATA}
        renderItem={renderRow}
        keyExtractor={(item: any): string => item.id}
      />
    </SafeAreaView>
  );
};

export { AuthScreen };
