import React, { useGlobal } from "reactn";
import styled from "styled-components";

import { SafeAreaView, Text, View } from "react-native";

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

  return (
    <SafeAreaView>
      <Wrapper>
        <Name>Hey{user ? ", " + user.name.replace(/\s.*/, "") : ""}</Name>
        <GymInfo>Missouri S&T Gym is 65% full and open</GymInfo>
      </Wrapper>
    </SafeAreaView>
  );
};

export { HomeScreen };
