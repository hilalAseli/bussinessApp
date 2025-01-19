import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import Category from "../Component/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/FIrebaseConfig";
import BussinessListExplore from "../Component/ComponentBussinessDetail/BussinessListExplore";

export default function Explore() {
  const [searchValue, setSearchValue] = useState("");
  const [getCategoryBussiness, setCategoryBussiness] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getDataCategory = async (category) => {
    setLoading(true);
    const q = query(
      collection(db, "BussinessList"),
      where("category", "==", category)
    );
    const snapShot = await getDocs(q);
    const collectionCategory = [];
    snapShot.forEach((doc) => {
      collectionCategory.push({ id: doc.id, ...doc.data() });
    });
    setCategoryBussiness(collectionCategory);
    setLoading(false);
    console.log("got data id!");
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={{ gap: 15, padding: 20, paddingTop: 40, marginBottom: 100 }}>
        <Text style={{ fontFamily: "Outfit_700Bold", fontSize: 30 }}>
          Explore More
        </Text>
        {/* search bar */}
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
        {/* category */}
        <Category
          explore={false}
          onCategorySelect={(category) => getDataCategory(category)}
          setLoading={setLoading}
        />
        {/* bussiness list */}
        <BussinessListExplore
          searchValue={searchValue}
          bussinessCategory={getCategoryBussiness}
          isLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
}
