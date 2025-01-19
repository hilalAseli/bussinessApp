import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function MenuList() {
  const navigation = useNavigation();
  const iconMenu = [
    {
      id: 1,
      name: "Add Bussiness",
      icon: require("../../assets/add.png"),
      path: "AddBussiness",
    },
    {
      id: 2,
      name: "My Bussiness",
      icon: require("../../assets/my bussiness.png"),
      path: "MyBussiness",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("../../assets/add.png"),
      path: "",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("../../assets/logout.png"),
      path: "Logout",
    },
  ];
  return (
    <View style={{ marginTop: 50 }}>
      <FlatList
        data={iconMenu}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.path,{menulist:item.name})}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: "white",
              flex: 1,
              margin: 5,
              padding: 10,
              borderRadius: 10,
              borderColor: "#6A5ACD",
              borderWidth: 1,
            }}
          >
            <Image source={item.icon} style={{ width: 50, height: 50 }} />
            <Text style={{ fontFamily: "Outfit_500Medium" }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Text
        style={{
          fontFamily: "Outfit_400Regular",
          color: "gray",
          textAlign: "center",
          marginTop: 50,
        }}
      >
        Developed by testerApp @2024
      </Text>
    </View>
  );
}
