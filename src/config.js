// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth   } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfzKk6arEoFBo4DJgQOemtDNrbXw2_JEQ",
  authDomain: "real-estate-817ac.firebaseapp.com",
  projectId: "real-estate-817ac",
  storageBucket: "real-estate-817ac.appspot.com",
  messagingSenderId: "127684334838",
  appId: "1:127684334838:web:c23d964e7f4e0f569cc8d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth , storage , app };


