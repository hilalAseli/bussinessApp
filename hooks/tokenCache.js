import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
const createTokenCache = () => {
  return {
    getToken: async (key) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was 🔒`);
        } else {
          console.log("no one values found in key:", key);
        }
        return item;
      } catch (err) {
        console.log("secure store get item error", err);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    saveToken: (key, token) => {
      return SecureStore.setItemAsync(key, token);
    },
  };
};
export const tokenCache =
  Platform.OS !== "web" ? createTokenCache() : undefined;
