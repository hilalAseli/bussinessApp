import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function BussinessListExplore({
  bussinessCategory,
  isLoading,
  searchValue,
}) {
  const navigation = useNavigation();
  const image = require("../../assets/empty.jpg");

  return (
    <View>
      {isLoading ? (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <ActivityIndicator size={"large"} color={"purple"} />
        </View>
      ) : bussinessCategory && bussinessCategory.length > 0 ? (
        <FlatList
          data={bussinessCategory.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card
              style={{ marginVertical: 10, overflow: "hidden" }}
              onPress={() =>
                navigation.navigate("BussinessId", {
                  bussinessId: item.id,
                })
              }
            >
              <Card.Cover
                source={{ uri: item.imageUrl }}
                style={{ height: 150, borderRadius: 0 }}
              />
              <Card.Content style={{ padding: 10 }}>
                <Text style={{ fontFamily: "Outfit_700Bold", fontSize: 16 }}>
                  {item.name}
                </Text>
                <Text style={{ fontFamily: "Outfit_400Regular", fontSize: 13 }}>
                  {item.address}
                </Text>
              </Card.Content>
            </Card>
          )}
        />
      ) : (
        bussinessCategory.length == 0 && (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Image source={image} style={{ width: 250, height: 250 }} />
            <Text
              style={{
                fontSize: 16,
                color: "gray",
                fontFamily: "Outfit_400Regular",
                marginTop: 10,
              }}
            >
              No businesses found here
            </Text>
          </View>
        )
      )}
    </View>
  );
}
