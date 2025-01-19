import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/FIrebaseConfig";
import { List } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Rating } from "react-native-rating-element";

export default function BussinessListByCategory({ route }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const emptyImage = require("../assets/empty.jpg");
  const [bussinessList, setBussinessList] = useState([]);
  const { category } = route.params;

  useEffect(() => {
    getBussinessList();
  }, []);

  const getBussinessList = async () => {
    setLoading(true);

    const q = query(
      collection(db, "BussinessList"),
      where("category", "==", category)
    );

    const snapShot = await getDocs(q);

    const resultBussinessList = [];

    snapShot.forEach((doc) => {
      console.log(doc.data());
      resultBussinessList.push({ id: doc.id, ...doc.data() });
    });
    setLoading(false);
    setBussinessList(resultBussinessList);
  };

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      refreshControl={
        <RefreshControl onRefresh={getBussinessList} refreshing={loading} />
      }
    >
      <View style={{ padding: 15 }}>
        {bussinessList.length > 0 && loading == false ? (
          bussinessList.map((item) => (
            <List.Item
              onPress={() => {
                console.log("Navigating to BussinessId with ID:", item.id);
                navigation.navigate("BussinessId", { bussinessId: item.id });
              }}
              key={item.name}
              style={{
                backgroundColor: "white",
                elevation: 2,
                borderRadius: 10,
                padding: 10,
                marginVertical: 5,
              }}
              left={() => (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{ width: 100, height: 100, borderRadius: 8 }}
                  />
                  <View style={{ flexDirection: "column", gap: 5 }}>
                    <Text
                      style={{ fontSize: 17, fontFamily: "Outfit_700Bold" }}
                    >
                      {item.name}
                    </Text>

                    <Text
                      style={{
                        fontSize: 13,
                        color: "gray",
                        fontFamily: "Outfit_400Regular",
                      }}
                    >
                      {item.address}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Rating
                          rated={item.averageRating}
                          totalCount={5}
                          ratingColor="#f1c644"
                          ratingBackgroundColor="#d4d4d4"
                          readonly={true}
                          icon="star"
                          direction="row"
                        />
                      </View>
                      <Text style={{ fontFamily: "Outfit_400Regular" }}>
                        {item.starCount}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          ))
        ) : loading ? (
          <ActivityIndicator
            size={"large"}
            color={"purple"}
            style={{ marginTop: "90%" }}
          />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 150,
            }}
          >
            <Image
              source={emptyImage}
              style={{ width: 300, height: 300, resizeMode: "contain" }}
            />
            <Text
              style={{
                fontSize: 16,
                color: "gray",
                fontFamily: "Outfit_400Regular",
                marginTop: 10,
              }}
            >
              No bussiness available
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
