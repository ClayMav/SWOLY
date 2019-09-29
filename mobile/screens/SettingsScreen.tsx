import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Container, Header, Content } from "native-base";

import { useAuth0 } from "../auth0-hooks";

const SettingsScreen = props => {
  const { logout } = useAuth0();

  const onLogout = () => {
    logout();
    props.navigation.navigate(`Auth`);
  };
  return (
    <Container>
      <Header />
      <Content>
        <Button title="Log out" onPress={onLogout} />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30
  }
});

export { SettingsScreen };
