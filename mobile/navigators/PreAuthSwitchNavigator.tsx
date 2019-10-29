import { createSwitchNavigator } from "react-navigation";

import { AuthLoadingScreen } from "../screens/AuthLoadingScreen";

import { GymStackNavigator } from "./GymStackNavigator";
import { WorkoutsStackNavigator } from "./WorkoutsStackNavigator";

const PreAuthSwitchNavigator = createSwitchNavigator(
  {
    App: WorkoutsStackNavigator,
    Auth: GymStackNavigator,
    AuthLoading: AuthLoadingScreen
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export { PreAuthSwitchNavigator };
