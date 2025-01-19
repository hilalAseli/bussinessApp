import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Searchbar } from "react-native-paper";
export default function Header() {
  const { user } = useUser();
  const [searchValue, setSearchValue] = useState("");
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: "purple",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 45, height: 45, borderRadius: 100 }}
        />
        <View style={{ flexDirection: "column", gap: 5 }}>
          <Text style={{ color: "white" }}>Welcome</Text>
          <Text
            style={{
              color: "white",
              fontFamily: "Outfit_500Medium",
              fontSize: 19,
            }}
          >
            {user?.fullName}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Searchbar
          onChangeText={(text) => setSearchValue(text)}
          value={searchValue}
          onBlur={() => setSearchValue("")}
          placeholder="search..."
          theme={{ roundness: 2 }}
          maxLength={30}
          inputStyle={{ fontFamily: "Outfit_400Regular" }}
          iconColor="purple"
        />
      </View>
    </View>
  );
}
