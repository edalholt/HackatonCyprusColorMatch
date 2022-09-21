// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSuY2cmXFMPEO2KSwLI6gOd9-xmoAUhFY",
  authDomain: "imagematch-2e4b5.firebaseapp.com",
  projectId: "imagematch-2e4b5",
  storageBucket: "imagematch-2e4b5.appspot.com",
  messagingSenderId: "882055323193",
  appId: "1:882055323193:web:77fa2301b9fb7e9a61b7e8",
  measurementId: "G-YGS1F56GNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {getFirestore} from "firebase/firestore";
const firestore = getFirestore();
export {firestore};