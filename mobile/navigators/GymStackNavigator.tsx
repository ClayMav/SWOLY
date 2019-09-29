import { createStackNavigator } from "react-navigation-stack";

import { MapScreen } from "../screens/MapScreen";
import { StartScreen } from "../screens/StartScreen";

const GymStackNavigator = createStackNavigator(
  {
    Start: {
      screen: StartScreen,
      navigationOptions: {
        header: null
      }
    },
    Map: MapScreen
  },
  { initialRouteName: "Start", headerMode: "screen" }
);

export { GymStackNavigator };
