import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Map } from "../components/Map";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hometime</Text>
      <Map />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

export { HomeScreen };
