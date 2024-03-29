import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chat-hub-cfc7f.firebaseapp.com",
  databaseURL: "https://chat-hub-cfc7f-default-rtdb.firebaseio.com/",
  projectId: "chat-hub-cfc7f",
  storageBucket: "chat-hub-cfc7f.appspot.com",
  messagingSenderId: "246041851564",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const database = getDatabase();
