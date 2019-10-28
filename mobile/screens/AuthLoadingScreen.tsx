import React, { useEffect } from "react";
import { useAuth0 } from "../auth0-hooks";

import { AsyncStorage, SafeAreaView, ActivityIndicator } from "react-native";

const AuthLoadingScreen: React.FC<any> = (props: any): JSX.Element => {
  const { loading, getTokenSilently }: any = useAuth0();

  useEffect(() => {
    if (loading) {
      return;
    }

    const setToken: () => void = async (): Promise<void> => {
      const token: string = (await getTokenSilently()) || "";
      await AsyncStorage.setItem("@SWOLY:token", token);
      if (token) {
        props.navigation.navigate(`App`);
      } else {
        props.navigation.navigate(`Auth`);
      }
    };

    setToken();
  }, [loading, getTokenSilently]);
  return (
    <SafeAreaView>
      <ActivityIndicator />
    </SafeAreaView>
  );
};

export { AuthLoadingScreen };
