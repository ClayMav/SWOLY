import { createStackNavigator } from "react-navigation-stack";

import { WorkoutDetailsScreen } from "../screens/WorkoutDetailsScreen";
import { AppTabNavigator } from "./AppTabNavigator";

const WorkoutsStackNavigator = createStackNavigator(
  {
    App: {
      screen: AppTabNavigator,
      navigationOptions: {
        header: null
      }
    },
    WorkoutDetails: {
      screen: WorkoutDetailsScreen,
      path: "workoutDetails",
      navigationOptions: () => ({
        title: `Workout Details`
      })
    }
  },
  {
    headerMode: "screen"
  }
);

export { WorkoutsStackNavigator };
