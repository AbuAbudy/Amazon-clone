import firebase from "firebase/compat/app";
//auth
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxFawTg1M5FrRtHkTpsJMGS_-bUPJszYw",
  authDomain: "clone-92837.firebaseapp.com",
  projectId: "clone-92837",
  storageBucket: "clone-92837.firebasestorage.app",
  messagingSenderId: "986627615569",
  appId: "1:986627615569:web:50e327677c1642b3e54170"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();