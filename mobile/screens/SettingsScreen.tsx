import React from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";

import { useAuth0 } from "../auth0-hooks";

const SettingsScreen = props => {
  const { logout } = useAuth0();

  const onLogout = () => {
    logout();
    props.navigation.navigate(`Auth`);
  };

  return (
    <SafeAreaView>
      <Button title="Log out" onPress={onLogout} />
    </SafeAreaView>
  );
};

export { SettingsScreen };
