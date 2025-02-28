// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import "firebase/auth"
import { getAuth,setPersistence, browserLocalPersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU7KbmY13rbr3N_1er-PymY4HZXMgl1JQ",
  authDomain: "flower-426b5.firebaseapp.com",
  projectId: "flower-426b5",
  storageBucket: "flower-426b5.firebasestorage.app",
  messagingSenderId: "630139403942",
  appId: "1:630139403942:web:62b2d0e2117e5c01843e67",
  measurementId: "G-SWX577RZTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export {db, auth}

