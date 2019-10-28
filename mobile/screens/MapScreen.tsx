import React from "react";
import {
  Text,
  View,
  Platform,
  Linking,
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
  padding: 30px;
  width: 100%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 10px 0 0 rgba(0, 0, 0, 0.14);
  height: 45%;
  justify-content: space-between;
`;

const Page = styled(View)`
  height: 100%;
`;

const PageMap = styled(Map)`
  height: 60%;
  width: 100%;
  position: absolute;
  z-index: 10;
  top: 0;
`;

const GymHead = styled(View)`
  display: flex;
  flex-direction: row;
`;
const GymInfo = styled(View)`
  flex: 1;
`;
const GymName = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const GymAddress = styled(Text)`
  font-size: 18px;
`;

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

const DirectionsButton = styled(TouchableOpacity)`
  background: #8f97dd;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
`;
const DirectionsText = styled(Text)`
  color: white;
  font-size: 18px;
`;

const MapScreen: React.SFC<any> = (props: any): JSX.Element => {
  const { loginWithRedirect } = useAuth0();
  const { data } = props.navigation.state.params;

  const openGps = () => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q="
    });
    const latLng = `${data.location.latitude},${data.location.longitude}`;
    const label = data.name;
    const url = Platform.select({
      ios: `${scheme}${encodeURIComponent(label)}@${latLng}`,
      android: `${scheme}${latLng}(${encodeURIComponent(label)})`
    });

    Linking.openURL(url);
  };

  const onLogin = async () => {
    //setGym(data);
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
        <GymHead>
          <GymInfo>
            <GymName>{data.name}</GymName>
            <GymAddress>{data.address}</GymAddress>
          </GymInfo>
          <LoginButton onPress={onLogin}>
            <LoginText>Log In</LoginText>
          </LoginButton>
        </GymHead>
        <DirectionsButton onPress={openGps}>
          <DirectionsText>Directions</DirectionsText>
        </DirectionsButton>
      </BottomSection>
    </Page>
  );
};

export { MapScreen };
