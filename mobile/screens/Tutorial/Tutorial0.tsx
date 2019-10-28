import React from "react";
import styled from "styled-components";

import { Text, Button, View, SafeAreaView } from "react-native";

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

const Tutorial0: React.SFC<any> = (props: any): JSX.Element => {
  const onPress = () => {
    props.navigation.navigate("Tutorial1");
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
        </Info>
        <Button title="Next" onPress={onPress} />
      </InfoBox>
    </SafeAreaView>
  );
};

export { Tutorial0 };
