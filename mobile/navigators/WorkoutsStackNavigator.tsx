import React from "react";

import { createStackNavigator } from "react-navigation-stack";

import { WorkoutDetailsScreen } from "../screens/WorkoutDetailsScreen";
import { WorkoutsScreen } from "../screens/WorkoutsScreen";

const WorkoutsStackNavigator = createStackNavigator({
  List: {
    screen: WorkoutsScreen,
    path: "workouts",
    navigationOptions: ({ navigation }) => ({
      title: "Workouts"
    })
  },
  WorkoutDetails: {
    screen: WorkoutDetailsScreen,
    path: "workoutDetails",
    navigationOptions: ({ navigation }) => ({
      title: `Workout Details`
    })
  }
});

export { WorkoutsStackNavigator };
