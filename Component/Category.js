import {
  View,
  Text,
  Image,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../config/FIrebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function Category({ explore = true, onCategorySelect ,setLoading}) {
  const navigation = useNavigation();
  const [categoryList, setCategory] = useState([]);

  const getCategoryList = async () => {
    const q = query(collection(db, "Category"));
    const snapShot = await getDocs(q);
    const resultCategory = [];
    snapShot.forEach((doc) => {
      console.log("Get icon success!", doc.data());
      resultCategory.push(doc.data());
    });
    setCategory(resultCategory);
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const handleCategorySelect = (item) => {
    if (explore) {
      navigation.navigate("BussinessList", { category: item.name });
    } else {
      setLoading(item)
      onCategorySelect(item.name);
    }
  };

  const onHandleMouseEnter = (scaleValue) => {
    Animated.spring(scaleValue, {
      toValue: 1.1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const onHandleMouseOut = (scaleValue) => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ padding: 15 }}>
      {explore && (
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
            Categories
          </Text>
          <TouchableOpacity>
            <Text style={{ color: "#6A5ACD", fontWeight: "500" }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={categoryList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const scaleValue = new Animated.Value(1);
          return (
            <TouchableOpacity
              onPress={() => handleCategorySelect(item)}
              activeOpacity={0.8}
              onPressIn={() => onHandleMouseEnter(scaleValue)}
              onPressOut={() => onHandleMouseOut(scaleValue)}
            >
              <Animated.View
                style={{
                  backgroundColor: "#E6E6F2",
                  marginHorizontal: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 100,
                  padding: 10,
                  width: 70,
                  height: 70,
                  transform: [{ scale: scaleValue }],
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                  marginBottom: 5,
                }}
              >
                <Image
                  source={{ uri: item.icon }}
                  style={{
                    height: 40,
                    width: 40,
                    resizeMode: "contain",
                  }}
                />
              </Animated.View>
              <Text
                style={{
                  fontSize: 12,
                  color: "#333",
                  textAlign: "center",
                  fontFamily: "Outfit_500Medium",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
