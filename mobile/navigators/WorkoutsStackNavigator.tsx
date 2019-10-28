import { createStackNavigator } from "react-navigation-stack";

import { WorkoutDetailsScreen } from "../screens/WorkoutDetailsScreen";
import { WorkoutsScreen } from "../screens/WorkoutsScreen";

const WorkoutsStackNavigator = createStackNavigator({
  List: {
    screen: WorkoutsScreen,
    path: "workouts",
    navigationOptions: () => ({
      title: "Workouts"
    })
  },
  WorkoutDetails: {
    screen: WorkoutDetailsScreen,
    path: "workoutDetails",
    navigationOptions: () => ({
      title: `Workout Details`
    })
  }
});

export { WorkoutsStackNavigator };
