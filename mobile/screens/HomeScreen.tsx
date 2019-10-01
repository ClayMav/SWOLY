import React, { useGlobal } from "reactn";
import styled from "styled-components";

import { StyleSheet, SafeAreaView, Text, View } from "react-native";

import { Map } from "../components/Map";

const Wrapper = styled(View)`
  padding: 30px;
`;

const Name = styled(Text)`
  margin-top: 15px;
  font-size: 34px;
  font-weight: bold;
`;

const GymInfo = styled(Text)`
  margin-top: 10px;
  font-size: 22px;
`;

const HomeScreen = () => {
  const [user] = useGlobal("user");
  const [gym] = useGlobal("gym");

  return (
    <SafeAreaView>
      <Wrapper>
        <Name>Hey{user ? ", " + user.name.replace(/\s.*/, "") : ""}</Name>
        <GymInfo>
          {gym ? gym.name : "Missouri S&T Gym"} is 65% full and open
        </GymInfo>
      </Wrapper>
    </SafeAreaView>
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
