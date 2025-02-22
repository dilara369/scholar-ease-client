
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,

  authDomain: "visa-navigator-95f14.firebaseapp.com",

  projectId: "visa-navigator-95f14",

  storageBucket: "visa-navigator-95f14.firebasestorage.app",

  messagingSenderId: "828489268999",

  appId: "1:828489268999:web:8344d2d605b93fa3d9cfa2",

  measurementId: "G-3YCP5J09TG"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;

