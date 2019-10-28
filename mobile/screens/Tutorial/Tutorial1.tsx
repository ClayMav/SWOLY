import React from "react";
import { View, Text, TouchableOpacity, AsyncStorage } from "react-native";
import styled from "styled-components";

import { useAuth0 } from "../../auth0-hooks";

const LoginButton = styled(TouchableOpacity)`
  background: #007a33;
  width: 100px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
`;
const LoginText = styled(Text)`
  color: white;
  font-size: 18px;
`;

const Tutorial1: React.SFC<any> = (props: any): JSX.Element => {
  const { loginWithRedirect } = useAuth0();

  const onLogin = async () => {
    await loginWithRedirect();
    const token = await AsyncStorage.getItem("@SWOLY:token");
    if (token) {
      console.log("DONE");
      props.navigation.navigate(`App`);
    } else {
      console.log("Failed to authenticate try again");
    }
  };

  return (
    <View>
      <LoginButton onPress={onLogin}>
        <LoginText>Log In</LoginText>
      </LoginButton>
    </View>
  );
};

export { Tutorial1 };
