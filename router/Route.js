import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeTabs from "./HomeTabs/HomeTabs";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Login from "../screen/Login";
import { tokenCache } from "../hooks/tokenCache";
import BussinessListByCategory from "../bussinessList/[category]";
import bussinessId from "../bussinessDetail/[bussinessId]";
import ActionButtonBussiness from "../Component/ComponentBussinessDetail/ActionButtonBussiness";
import About from "../Component/ComponentBussinessDetail/About";
import ReviewsBussiness from "../Component/ComponentBussinessDetail/ReviewsBussiness";
import AddBussiness from "../Component/ComponentBussinessDetail/AddBussiness";
import MyBussiness from "../Component/ComponentBussinessDetail/MyBussiness";
import Logout from "../screen/Logout";
const Stack = createStackNavigator();

export default function Route() {
  const linking = {
    prefixes: ["bussinessApp://"],
    config: {
      screens: {
        HomeTabs: "HomeTabs",
        Login: "Login",
        BussinessList: "bussinessList/:category",
      },
    },
  };
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <NavigationContainer linking={linking}>
        <SignedIn>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen
              name="BussinessList"
              component={BussinessListByCategory}
              options={({ route }) => ({
                headerShown: true,
                headerTitle: route.params.category,
              })}
            />
            <Stack.Screen name="BussinessId" component={bussinessId} />
            <Stack.Screen
              name="ActionButton"
              component={ActionButtonBussiness}
            />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen
              name="ReviewsBussiness"
              component={ReviewsBussiness}
            />
            <Stack.Screen
              name="AddBussiness"
              component={AddBussiness}
              options={{ headerTitle: "Add new bussiness", headerShown: true }}
            />
            <Stack.Screen
              component={MyBussiness}
              name="MyBussiness"
              options={{ headerTitle: "My Bussiness", headerShown: true }}
            />
            <Stack.Screen component={Logout} name="Logout" />
          </Stack.Navigator>
        </SignedIn>
        <SignedOut>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </SignedOut>
      </NavigationContainer>
    </ClerkProvider>
  );
}
