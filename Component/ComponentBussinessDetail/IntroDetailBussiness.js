import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function IntroDetailBussiness({ bussiness }) {
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 30,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={"white"} />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={30} color={"white"} />
      </View>
      <Image
        source={{ uri: bussiness.imageUrl }}
        style={{ height: 340, width: "100%" }}
      />
      <View style={{backgroundColor:'white',padding:20,borderTopLeftRadius:25,borderTopRightRadius:25,marginTop:-20}}>
        <Text style={{fontFamily:'Outfit_700Bold',fontSize:26}}>{bussiness.name}</Text>
        <Text style={{fontFamily:'Outfit_400Regular',fontSize:18}}>{bussiness.address}</Text>
      </View>
    </View>
  );
}
