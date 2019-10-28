import { createSwitchNavigator } from "react-navigation";

import { AuthLoadingScreen } from "../screens/AuthLoadingScreen";

import { AppTabNavigator } from "./AppTabNavigator";
import { GymStackNavigator } from "./GymStackNavigator";

const PreAuthSwitchNavigator = createSwitchNavigator(
  {
    App: AppTabNavigator,
    Auth: GymStackNavigator,
    AuthLoading: AuthLoadingScreen
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export { PreAuthSwitchNavigator };
