// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGwRu8wCcKvr3Wqbpqf83Fl_hhUK4Bzh0",
  authDomain: "tinder-4db58.firebaseapp.com",
  projectId: "tinder-4db58",
  storageBucket: "tinder-4db58.appspot.com",
  messagingSenderId: "906402734024",
  appId: "1:906402734024:web:c07e90afbfdb1f40b22afd",
  measurementId: "G-NHH81GP3K7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
