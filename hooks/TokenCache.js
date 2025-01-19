import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const createTokenCache = () => {
  return {
    getToken: async (key) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log("user was 🔒", key);
        } else {
          console.log("no one user can 🔒 in here", key);
        }
        return item;
      } catch (error) {
        console.log("error", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    saveToken: (key, token) => {
      return SecureStore.setItemAsync(key, token);
    },
  };
};
export const TokenCache =
  Platform.OS !== "web" ? createTokenCache() : undefined;
