import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CardSwipeScreen from "./CardSwipeScreen";
import RotationSliderScreen from "./RotationSliderScreen";

const Stack = createNativeStackNavigator();

const transparentHeaderOptions = {
  headerTransparent: true,
  headerTintColor: "white", // Set the color of the header text
  headerTitleStyle: {
    color: "white", // Set the color of the header title
  },
};

export default function AllRoutes() {
  return (
    <Stack.Navigator initialRouteName="CardSwipe">
      <Stack.Screen
        name="CardSwipe"
        component={CardSwipeScreen}
        options={{ ...transparentHeaderOptions, headerShown: false }}
      />
      <Stack.Screen
        name="RotationSlider"
        component={RotationSliderScreen}
        options={transparentHeaderOptions}
      />
    </Stack.Navigator>
  );
}
