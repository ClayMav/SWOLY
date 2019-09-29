import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Map } from "../components/Map";
import styled from "styled-components";

import { useAuth0 } from "../auth0-hooks";

const BottomSection = styled(View)`
  background: white;
  position: absolute;
  z-index: 100;
  bottom: 0;
  width: 100%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 10px 0 0 rgba(0, 0, 0, 0.14);
  height: 30%;
`;

const Page = styled(View)`
  height: 100%;
`;

const PageMap = styled(Map)`
  height: 74%;
  width: 100%;
  position: absolute;
  z-index: 10;
  top: 0;
`;

const LoginButton = styled(TouchableOpacity)`
  background: green;
  color: white;
  width: 200px;
  height: 80px;
`;

const MapScreen: React.SFC<any> = (props: any): JSX.Element => {
  const { logout, loginWithRedirect } = useAuth0();
  const { data } = props.navigation.state.params;

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
    <Page>
      <PageMap marker={data} />
      <BottomSection>
        <Text>SWOLY</Text>
        <Text>{data.name}</Text>
        <Text>{"Nope" || data.description}</Text>
        <LoginButton onPress={onLogin}>
          <Text>Log In</Text>
        </LoginButton>
      </BottomSection>
    </Page>
  );
};

export { MapScreen };
