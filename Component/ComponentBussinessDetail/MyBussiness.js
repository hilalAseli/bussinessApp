import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { db } from "../../config/FIrebaseConfig";
import { Card, Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function MyBussiness() {
  const [mybussiness, setmybussiness] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigation = useNavigation();
  const getMyBussiness = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "BusinessListNew"));
      const snapShot = await getDocs(q);
      const tempData = [];
      snapShot.forEach((doc) => {
        setLoading(false);
        console.log("got data !", doc.data());
        tempData.push({ id: doc.id, ...doc.data() });
      });
      setmybussiness(tempData);
    } catch (err) {
      setLoading(true);
      console.log("data error", err);
    }
  };
  useEffect(() => {
    getMyBussiness();
  }, []);
  const onpressdelete = async (id) => {
    try {
      await deleteDoc(doc(db, "BusinessListNew", id));
      setmybussiness((prev) => prev.filter((item) => item.id !== id))
      ToastAndroid.show("data telah di hapus", ToastAndroid.BOTTOM);
    } catch (err) {
      console.log("error delete data", err);
    }
  };
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={{ gap: 15, padding: 20, paddingTop: 40, marginBottom: 100 }}>
        <Text style={{ fontFamily: "Outfit_700Bold", fontSize: 30 }}>
          See the development of your business here
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
        {/* bussiness list */}
        <FlatList
          data={mybussiness.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
          )}
          renderItem={({ item }) => (
            <Card style={{ marginVertical: 10, overflow: "hidden" }}>
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
                <View style={{ marginTop:10 }}>
                  <TouchableOpacity onPress={() => onpressdelete(item.id)}>
                    <View
                      style={{
                        backgroundColor: "red",
                        padding: 10,
                        borderRadius: 8,
                        alignItems: "center",
                      }}
                    >
                    <Ionicons name="trash" size={20} color={'white'}/>
                    </View>
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
          )}
        />
      </View>
    </ScrollView>
  );
}
