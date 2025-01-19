import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "../../config/FIrebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const [categoryList, setCategoryList] = useState([]);
  const [imageUrl, setImage] = useState("");
  const [pickerSelect, setPickerSelect] = useState(null);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [about, setAbout] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const onImageClick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const q = query(collection(db, "Category"));
    const snapshot = await getDocs(q);
    const data = [];
    snapshot.forEach((doc) => {
      data.push({
        label: doc.data().name,
        value: doc.data().name,
      });
    });
    setCategoryList(data);
  };

  const saveDataBusiness = async () => {
    if (
      !name ||
      !address ||
      !contact ||
      !about ||
      !email ||
      !pickerSelect ||
      !imageUrl
    ) {
      alert("Please fill out all fields.");
      return;
    }
    setLoading(true);
    try {
      const docId = `${name}-${new Date().getTime()}`;
      await setDoc(doc(db, "BusinessListNew", docId), {
        name: name,
        imageUrl: imageUrl,
        username: user?.fullName,
        userimage: user?.imageUrl,
        address: address,
        contact: contact,
        email: email,
        about: about,
        category: pickerSelect,
        useremail: user?.primaryEmailAddress.emailAddress,
        createdAt: new Date().toISOString(),
      });
      ToastAndroid.show("succes add new bussines!", ToastAndroid.BOTTOM);
      setName("");
      setAddress("");
      setContact("");
      setEmail("");
      setAbout("");
      setImage("");
      setPickerSelect(null);
    } catch (err) {
      console.log(err);
      alert("failed add new bussiness");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 20, backgroundColor: "white", flex: 1, gap: 20 }}>
        <View>
          <Text style={{ fontFamily: "Outfit_700Bold", fontSize: 25 }}>
            Add Business
          </Text>
          <Text style={{ fontFamily: "Outfit_400Regular", color: "gray" }}>
            Fill all details to add a new business
          </Text>
        </View>

        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={onImageClick}
        >
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={{ width: 150, height: 150, borderRadius: 15 }}
            />
          ) : (
            <Image
              source={require("../../assets/addImage.png")}
              style={{ width: 150, height: 150 }}
            />
          )}
        </TouchableOpacity>

        <View style={{ gap: 15 }}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            style={{
              padding: 10,
              backgroundColor: "white",
              color: "black",
              fontFamily: "Outfit_400Regular",
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 6,
            }}
          />
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
            style={{
              padding: 10,
              backgroundColor: "white",
              color: "black",
              fontFamily: "Outfit_400Regular",
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 6,
            }}
          />
          <TextInput
            value={contact}
            onChangeText={setContact}
            placeholder="Contact"
            style={{
              padding: 10,
              backgroundColor: "white",
              color: "black",
              fontFamily: "Outfit_400Regular",
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 6,
            }}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            style={{
              padding: 10,
              backgroundColor: "white",
              color: "black",
              fontFamily: "Outfit_400Regular",
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 6,
            }}
          />
          <TextInput
            value={about}
            onChangeText={setAbout}
            placeholder="About"
            multiline
            numberOfLines={5}
            style={{
              padding: 10,
              backgroundColor: "white",
              color: "black",
              fontFamily: "Outfit_400Regular",
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 6,
              height: 100,
            }}
          />
        </View>

        <View
          style={{
            borderWidth: 1,
            borderRadius: 6,
            backgroundColor: "white",
            borderColor: "gray",
          }}
        >
          <RNPickerSelect
            onValueChange={setPickerSelect}
            items={categoryList}
            placeholder={{ label: "Select a category...", value: null }}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="purple" />
        ) : (
          <TouchableOpacity onPress={saveDataBusiness}>
            <View
              style={{
                backgroundColor: "purple",
                padding: 20,
                borderRadius: 10,
                borderColor: "white",
              }}
            >
              <Text
                style={{
                  fontFamily: "Outfit_400Regular",
                  color: "white",
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                Add New Business
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
