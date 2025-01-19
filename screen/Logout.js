import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { signOut } from "@clerk/clerk-expo";
import { List } from "react-native-paper";

export default function Logout() {
  const { user } = useUser();
  const imageLogout = require("../assets/logoutIlustration.png");
  const onPressLogout = async () => {
    try {
      await signOut();
      console.log("User successfully logged out");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        gap: 15,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontFamily: "Outfit_700Bold", fontSize: 30 }}>
        Logout your account
      </Text>
      <View style={{ alignItems: "center" }}>
        <Image style={{ width: 200, height: 200 }} source={imageLogout} />
      </View>
      <View style={{ paddingTop: 400 }}>
        <List.Item
          style={{
            backgroundColor: "white",
            elevation: 2,
            borderRadius: 8,
            borderWidth: 0.3,
            borderColor: "gray",
            padding: 10,
            marginVertical: 5,
          }}
          left={() => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Image
                source={{ uri: user.imageUrl }}
                style={{ width: 50, height: 50, borderRadius: 10 }}
              />
              <Text>{user.fullName}</Text>
            </View>
          )}
          right={() => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity onPress={onPressLogout}>
                <View
                  style={{
                    backgroundColor: "red",
                    padding: 5,
                    borderRadius: 6,
                  }}
                >
                  <Text
                    style={{ color: "white", fontFamily: "Outfit_400Regular" }}
                  >
                    Logout
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}
