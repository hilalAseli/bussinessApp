import { View, Text } from "react-native";
import React from "react";
import UserIntro from "../Component/ComponentProfile/UserIntro";
import MenuList from "../Component/ComponentProfile/MenuList";

export default function Profile() {
  return (
    <View style={{ padding: 20,flex:1,backgroundColor:'white'}}>
      <Text style={{ fontFamily: "Outfit_700Bold", fontSize: 35 }}>
        Profile
      </Text>
      {/* user intro */}
      <UserIntro />
      {/* menu list */}
      <MenuList />
    </View>
  );
}
