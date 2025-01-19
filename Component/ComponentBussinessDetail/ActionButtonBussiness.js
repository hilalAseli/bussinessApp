import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import React from "react";

export default function ActionButtonBussiness({ bussiness }) {
  const iconButtonAction = [
    {
      id: 1,
      name: "Call",
      icon: require("../../assets/Call.png"),
      url: "tel:" + bussiness.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: require("../../assets/Location.png"),
      url:
        "https://www.google.com/maps/search/?api=1&query=" + bussiness.address,
    },
    {
      id: 3,
      name: "Website",
      icon: require("../../assets/Website.png"),
      url: bussiness.website,
    },
    {
      id: 4,
      name: "Share",
      icon: require("../../assets/share.jpg"),
      url: bussiness.website,
    },
  ];
  return (
    <View style={{ padding: 20, backgroundColor: "white" }}>
      <FlatList
        numColumns={4}
        data={iconButtonAction}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(item.name === "Share" ? Share.share({message:bussiness?.name+"\nAddress:"+bussiness.address}) : item.url)
            }
            key={index}
            style={{
              flex: 1,
              alignItems: "center",
              gap: 5,
            }}
          >
            <Image source={item.icon} style={{ width: 30, height: 30 }} />
            <Text style={{ fontFamily: "Outfit_500Medium" }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
