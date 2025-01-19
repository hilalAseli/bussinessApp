import { View, ActivityIndicator, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/FIrebaseConfig";
import IntroDetailBussiness from "../Component/ComponentBussinessDetail/IntroDetailBussiness";
import ActionButtonBussiness from "../Component/ComponentBussinessDetail/ActionButtonBussiness";
import About from "../Component/ComponentBussinessDetail/About";
import ReviewsBussiness from "../Component/ComponentBussinessDetail/ReviewsBussiness";

export default function bussinessId({ route }) {
  const { bussinessId } = route.params;
  const [dataBussinessId, setDataBussinessId] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getBussinessId();
  }, []);
  const getBussinessId = async () => {
    console.log("Fetching data for bussinessId:", bussinessId);
    const q = doc(db, "BussinessList", bussinessId);
    const docSnapShot = await getDoc(q);
    if (docSnapShot.exists()) {
      setLoading(false);
      console.log("got document !", docSnapShot.data());
      setDataBussinessId({ id: docSnapShot.id, ...docSnapShot.data() });
    } else {
      setLoading(true);
      console.log("document not found !");
    }
  };
  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={"purple"}
          style={{ marginTop: "70%" }}
        />
      ) : (
        <View>
          <IntroDetailBussiness bussiness={dataBussinessId} />
          <ActionButtonBussiness bussiness={dataBussinessId} />
          <About bussiness={dataBussinessId} />
          <ReviewsBussiness bussiness={dataBussinessId} />
        </View>
      )}
    </ScrollView>
  );
}
