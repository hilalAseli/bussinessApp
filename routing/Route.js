import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Calculator from "../calculator/Calculator";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Login from "../Login/Login";
import { TokenCache } from "../hooks/TokenCache";
const Stack = createStackNavigator();
export default function Route() {
  const linking = {
    prefixes: ["ReactNativeCalculator://"],
    config: {
      screens: {
        Calculator: "Calculator",
        Login: "Login",
      },
    },
  };
  return (
    <ClerkProvider
      tokenCache={TokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <NavigationContainer linking={linking}>
        <SignedIn>
          <Stack.Navigator>
            <Stack.Screen
              name="Calculator"
              component={Calculator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </SignedIn>
        <SignedOut>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </SignedOut>
      </NavigationContainer>
    </ClerkProvider>
  );
}
