import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { useAuth0 } from "./auth0-hooks";

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import { HomeScreen } from "./screens/HomeScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { WorkoutsScreen } from "./screens/WorkoutsScreen";

import { Map } from "./components/Map";
import { WorkoutDetails } from "./components/WorkoutDetails";

const WorkoutsStack = createStackNavigator({
  List: {
    screen: WorkoutsScreen,
    path: "workouts",
    navigationOptions: ({ navigation }) => ({
      title: "Workouts"
    })
  },
  WorkoutDetails: {
    screen: WorkoutDetails,
    path: "workoutDetails",
    navigationOptions: ({ navigation }) => ({
      title: `Workout Details`
    })
  }
});

const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Workouts: WorkoutsStack,
    Settings: SettingsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName: string;
        if (routeName === "Home") {
          iconName = `ios-information-circle${focused ? "" : "-outline"}`;
        } else if (routeName === "Workouts") {
          iconName = `ios-list`;
        } else if (routeName === "Settings") {
          iconName = `ios-settings`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);

const AppContainer = createAppContainer(bottomTabNavigator);

interface IParams {
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
  nonce: string;
}

const App: React.FC = (): JSX.Element => {
  const {
    loading,
    user,
    loginWithRedirect,
    getTokenSilently
  }: any = useAuth0();

  useEffect(() => {
    if (loading) {
      return;
    }

    const setToken: () => void = async (): Promise<void> => {
      const token: string = (await getTokenSilently()) || "";
      await AsyncStorage.setItem("@SWOLY:token", token);
    };

    setToken();
  }, [loading, getTokenSilently]);

  const onLogin = () => loginWithRedirect();

  // If logged in, start getting user
  // show loading while waiting
  //
  if (user) {
    return <AppContainer />;
  } else {
    return (
      <View style={styles.container}>
        <Button title="Log in with Auth0" onPress={onLogin} />
        <Map />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    marginTop: 40,
    textAlign: "center"
  }
});

export default App;
