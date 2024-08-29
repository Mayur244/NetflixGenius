import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDwq-K3NGI31TD2cxcxTXsMQo1VYdMJ82M",
  authDomain: "netflixgenius-1bc80.firebaseapp.com",
  projectId: "netflixgenius-1bc80",
  storageBucket: "netflixgenius-1bc80.appspot.com",
  messagingSenderId: "637138212716",
  appId: "1:637138212716:web:8f5284834dbd3bc9f1c549",
  measurementId: "G-YW54L4D72D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();