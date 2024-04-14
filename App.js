import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Registration from "./components/Registration";
import Login from "./components/Login";
import { Pressable } from "react-native";
import { AsyncStorage } from 'react-native';
import PageMakePhoto from "./components/PageMakePhoto";
import ProductPage from "./components/ProductPage"
import HomeScreen from "./components/HomeScreen"

const Stack = createNativeStackNavigator();

export const MyContext = React.createContext();

export default function App() {

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="">
        <Stack.Screen 
                name="Home"
                component={HomeScreen}
                options={{
                  title: "Главная",
                  headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 28,
                  },
                  headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen 
                name="Registration"
                component={Registration}
                options={{
                  title: "Регистрация",
                  // headerStyle: {
                  //   backgroundColor: "blue"
                  // },
                  // headerTintColor: "Red",
                  headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 28,
                  },
                  headerTitleAlign: 'center'
                  // headerRight: () => {
                  //   <Pressable onPress={{}}>
                  //     <Text>Войти</Text>
                  //   </Pressable>
                  // }
                }}
            />
            <Stack.Screen 
                name="Login"
                component={Login}
                options={{
                  title: "Войти",
                  headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 28,
                  },
                  headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen 
                name="PageMakePhoto"
                component={PageMakePhoto}
                options={{
                  title: "Сделать фото",
                  headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 28,
                  },
                  headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen 
                name="ProductPage"
                component={ProductPage}
                options={{
                  title: "Статистика по товару",
                  headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 24,
                  },
                  headerTitleAlign: 'center'
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

