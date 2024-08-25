import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDBN4-K2BGJVO9Qq0kvUx6RDy6E0utzyQ",
  authDomain: "ipsumdb-15e69.firebaseapp.com",
  projectId: "ipsumdb-15e69",
  storageBucket: "ipsumdb-15e69.appspot.com",
  messagingSenderId: "753488854811",
  appId: "1:753488854811:web:8ce31a91ed48b682045dbe"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);