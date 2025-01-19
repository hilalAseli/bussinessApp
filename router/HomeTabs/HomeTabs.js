import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../../screen/Home";
import { Ionicons } from "@expo/vector-icons";
import Profile from "../../screen/Profile";
import Explore from "../../screen/Explore";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "purple",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#f8f9fa",
            margin: 20,
            borderRadius: 15,
            height: 70,
            position: "absolute",
          },
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
            padding: 15,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={Home} options={{tabBarIcon:({focused,color,size}) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={size}/>
        ),}}/>
        <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon:({focused,size,color}) => (
            <Ionicons name={focused ? 'people-circle' : 'people-circle-outline'} color={color} size={size}/>
        )}}/>
        <Tab.Screen name="Explore" component={Explore} options={{tabBarIcon:({focused,size,color}) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={size}/>
        )}}/>
      </Tab.Navigator>
  );
}
