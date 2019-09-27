import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { useAuth0 } from "../auth0-hooks";

const SettingsScreen = () => {
  const { logout } = useAuth0();

  const onLogout = () => logout();
  return (
    <View style={styles.container}>
      <Text>SET ME UP</Text>
      <Button title="Log out" onPress={onLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30
  }
});

export { SettingsScreen };
