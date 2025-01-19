import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";

export default function Calculator() {
  const [input1, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState(null);
  const [operation, setOperation] = useState(null);
  const buttonInput = ["x", "-", "+"];
  const handlePress = (count) => {
    setOperation(count);
    const num1 = parseFloat(input1);
    const num2 = parseFloat(input2);
    if (isNaN(num1) || isNaN(num2)) {
      ToastAndroid.show("isi kolom dengan angka", ToastAndroid.BOTTOM);
    }
    let res;
    switch (operation) {
      case "+":
        res = num1 + num2;
        break;
      case "-":
        res = num1 - num2;
        break;
      case "x":
        res = num1 * num2;
        break;
      default:
        res = "invalid";
    }
    setResult(res);
    setInput("");
    setInput2("");
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        React Native Calculator
      </Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={(value) => setInput(value)}
        placeholder="isi angka pertama"
        style={{
          backgroundColor: "white",
          padding: 10,
          width: "80%",
          alignItems: "center",
          borderRadius: 8,
          borderWidth: 0.3,
          borderColor: "gray",
        }}
      />
      <TextInput
        keyboardType="numeric"
        onChangeText={(value) => setInput2(value)}
        placeholder="isi angka kedua"
        style={{
          backgroundColor: "white",
          padding: 10,
          width: "80%",
          alignItems: "center",
          borderRadius: 8,
          borderWidth: 0.3,
          borderColor: "gray",
        }}
      />
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        {buttonInput.map((item) => (
          <TouchableOpacity key={item} onPress={() => setOperation(item)}>
            <View
              style={{
                backgroundColor: "gray",
                alignItems: "center",
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ fontSize: 16, color: "white" }}>{item}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <TouchableOpacity onPress={handlePress}>
          <View
            style={{
              padding: 10,
              backgroundColor: "green",
              width: 300,
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white" }}>Hasil</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text>= {result}</Text>
      </View>
    </View>
  );
}
