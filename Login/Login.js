import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
export default function Login() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();
  }, []);

  const handlePressLogin = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/Calculator", {
          scheme: "ReactNativeCalculator",
        }),
      });
      if (createdSessionId) {
       await setActive({ session: createdSessionId });
       console.log("Berhasil")
      } else {
        console.log("gagal");
      }
    } catch (err) {
      console.log("error bgt", err);
    }
  }, [startOAuthFlow]);
  return (
    <View style={{ padding: 15, paddingTop: 40, flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>
        Login for use react native calculator
      </Text>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <View>
          <TouchableOpacity onPress={handlePressLogin}>
            <View
              style={{
                backgroundColor: "blue",
                padding: 10,
                borderRadius: 10,
                width: 300,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>Join With Us</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
