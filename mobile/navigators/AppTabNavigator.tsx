import React from "react";

import { createBottomTabNavigator } from "react-navigation-tabs";

import { Ionicons } from "@expo/vector-icons";

import { HomeScreen } from "../screens/HomeScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

import { WorkoutsStackNavigator } from "./WorkoutsStackNavigator";

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Workouts: WorkoutsStackNavigator,
    Settings: SettingsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName: string = `ios-list`;
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

export { AppTabNavigator };
