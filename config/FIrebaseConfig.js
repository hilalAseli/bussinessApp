// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoHGUy8LkPYRNEnmGkanfQdvLOpK_BMZk",
  authDomain: "bussinessapp-ee1f6.firebaseapp.com",
  projectId: "bussinessapp-ee1f6",
  storageBucket: "bussinessapp-ee1f6.firebasestorage.app",
  messagingSenderId: "682486034651",
  appId: "1:682486034651:web:9f4110e84c3f626b141cfe",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
