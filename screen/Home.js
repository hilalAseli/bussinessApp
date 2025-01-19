import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../Component/Header";
import Slider from "../Component/Slider";
import Category from "../Component/Category";
import PopularBussiness from "../Component/PopularBussiness";

export default function Home() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ gap: 15 ,marginBottom:'20%'}}>
        {/* Header */}
        <Header />
        {/* Slider */}
        <Slider />
        {/* Category */}
        <Category/>
        {/* Popular Bussiness List */}
        <PopularBussiness/>
      </View>
    </ScrollView>
  );
}
