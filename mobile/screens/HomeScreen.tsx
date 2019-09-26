import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Map } from "../components/Map";

const HomeScreen = () => {
  return (
    <View>
      <Text>Hometime</Text>
      <Map />
    </View>
  );
};

const styles = StyleSheet.create({});

export { HomeScreen };
