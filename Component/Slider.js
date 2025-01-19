import { View, Text, Dimensions, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../config/FIrebaseConfig";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export default function Slider() {
  const [SliderList, setSliderList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getSliderList();
  }, []);

  const getSliderList = async () => {
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);
    const SliderData = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      SliderData.push(doc.data());
    });
    setSliderList(SliderData);
  };

  return (
    <View>
      <View style={{padding:15}}>
        <Text style={{fontFamily:'Outfit_700Bold',fontSize:22}}>#Special for you</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Carousel
          loop={false}
          width={width - 30}
          height={200}
          autoPlay={false}
          data={SliderList}
          onSnapToItem={(index) => setCurrentIndex(index)}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <View style={{ flex: 1, justifyContent: "center",marginHorizontal:5}}>
              <Image
                source={{ uri: item.imageUrl }}
                style={{ height: "100%", width: "100%",borderRadius:10 }}
              />
            </View>
          )}
        />
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 0,
            zIndex: 100,
            alignSelf: "center",
            marginBottom: 20,
          }}
        >
          {SliderList.map((_, index) => (
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: currentIndex === index ? "#fff" : "#aaa",
                borderRadius: 50,
                marginHorizontal: 5,
                transform: [{ scale: currentIndex === index ? 1.2 : 1 }],
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
