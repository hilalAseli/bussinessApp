import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

export default function Login() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();
  }, []);

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/HomeTabs", { scheme: "bussinessApp" }),
      });
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        console.log("error bre");
      }
    } catch (err) {
      console.log("hhe", err);
    }
  }, [startOAuthFlow]);
  
  return (
    <View style={{ flex: 1, gap: 15, backgroundColor: "white" }}>
      <View style={{ alignItems: "center", marginTop: 150 }}>
        <Image
          style={{
            height: 400,
            width: 250,
            borderWidth: 8,
            borderRadius: 20,
          }}
          source={require("../assets/Dashboard.jpg")}
        />
      </View>
      <View style={{ backgroundColor: "white", padding: 20, marginTop: -30 }}>
        <Text
          style={{
            fontFamily: "Outfit_700Bold",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Your Ultimate{" "}
          <Text style={{ color: "blue" }}>Community Bussiness Directory</Text>
          <Text>App</Text>
        </Text>
        <Text
          style={{
            fontFamily: "Outfit_400Regular",
            fontSize: 15,
            textAlign: "center",
            top: 15,
            color: "gray",
          }}
        >
          Find your favorite bussiness near your and post your own bussiness to
          your community
        </Text>
      </View>
      <View
        style={{
          margin: 10,
          alignItems: "center",
          backgroundColor: "blue",
          padding: 15,
          borderRadius: 25,
        }}
      >
        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: "white", fontFamily: "Outfit_400Regular" }}>
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
