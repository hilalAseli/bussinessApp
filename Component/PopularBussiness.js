import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../config/FIrebaseConfig";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PopularBussiness() {
  const [popularBussinessList, setPopularBussiness] = useState([]);
  const navigation = useNavigation();
  const getPopularBussiness = async () => {
    const q = query(collection(db, "BussinessList"));
    const snapShot = await getDocs(q);
    const resultGetDocsPopular = [];
    snapShot.forEach((doc) => {
      console.log("Succes get popular bussiness list !", doc.data());
      resultGetDocsPopular.push({ id: doc.id, ...doc.data() });
    });
    setPopularBussiness(resultGetDocsPopular);
  };

  useEffect(() => {
    getPopularBussiness();
  }, []);

  return (
    <View style={{ padding: 15 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontFamily: "Outfit_700Bold",
          }}
        >
          Popular Bussiness
        </Text>
        <TouchableOpacity>
          <Text style={{ color: "#6A5ACD", fontWeight: "500" }}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={popularBussinessList}
        renderItem={({ item }) => (
          <Card
            style={{ width: 250, margin: 5, overflow: "hidden" }}
            onPress={() =>
              navigation.navigate("BussinessId", { bussinessId: item.id })
            }
          >
            <Card.Cover
              style={{ height: 150, borderRadius: 0 }}
              source={{ uri: item.imageUrl }}
            />
            <Card.Content style={{ padding: 10 }}>
              <Text style={{ fontFamily: "Outfit_700Bold", fontSize: 17 }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontFamily: "Outfit_400Regular",
                  fontSize: 13,
                  color: "gray",
                }}
              >
                {item.address}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    padding: 1,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ marginRight: 10, fontFamily: "Outfit_400Regular" }}
                  >
                    {item.starCount}
                  </Text>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Ionicons
                      name="star"
                      size={15}
                      color={item.averageRating > index ? "#FFD700" : "gray"}
                    />
                  ))}
                </View>
                <View
                  style={{
                    backgroundColor: "#9B59B6",
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Outfit_400Regular",
                      fontSize: 12,
                    }}
                  >
                    {item.category}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}
