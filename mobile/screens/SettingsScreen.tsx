import React from "react";
import { Button, SafeAreaView } from "react-native";

import { useAuth0 } from "../auth0-hooks";

const SettingsScreen: React.FC<any> = (props: any): JSX.Element => {
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
