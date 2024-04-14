import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="About">
                <Stack.Screen 
                    name="Home"
                    component={HomeScreen}
                />
                <Stack.Screen 
                    name="Home"
                    component={AboutScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};