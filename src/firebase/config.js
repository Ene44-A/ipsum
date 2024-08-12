// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwBE5lJoMhjMQY6KjKdJDqJlIfBkhS-nI",
  authDomain: "ipsum-7944f.firebaseapp.com",
  projectId: "ipsum-7944f",
  storageBucket: "ipsum-7944f.appspot.com",
  messagingSenderId: "659955552633",
  appId: "1:659955552633:web:1f12ed186f4ba3c9429fa8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);