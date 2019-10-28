import { createStackNavigator } from "react-navigation-stack";

import { Tutorial0 } from "../screens/Tutorial/Tutorial0";
import { Tutorial1 } from "../screens/Tutorial/Tutorial1";

const GymStackNavigator = createStackNavigator(
  {
    Tutorial0: {
      screen: Tutorial0,
      navigationOptions: {
        header: null
      }
    },
    Tutorial1: {
      screen: Tutorial1,
      navigationOptions: {
        header: null
      }
    }
  },
  { initialRouteName: "Tutorial0", headerMode: "screen" }
);

export { GymStackNavigator };
