<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Route from './routing/Route';

export default function App() {
  return (
   <Route/>
  );
}


=======
import { View, Text } from "react-native";
import React from "react";
import Route from "./router/Route";
import {
  useFonts,
  Outfit_100Thin,
  Outfit_200ExtraLight,
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Outfit_800ExtraBold,
  Outfit_900Black,
} from "@expo-google-fonts/outfit";
export default function App() {
  let [fontsLoaded] = useFonts({
    Outfit_100Thin,
    Outfit_200ExtraLight,
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_800ExtraBold,
    Outfit_900Black,
  });
  if(!fontsLoaded){
    null
  }
  return <Route />;
}
>>>>>>> b0b24aac08d76897c15b28629158f5c89f23ca64
