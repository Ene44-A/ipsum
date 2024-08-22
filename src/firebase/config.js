import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";



// const firebaseConfig = {
//   apiKey: "AIzaSyBwBE5lJoMhjMQY6KjKdJDqJlIfBkhS-nI",
//   authDomain: "ipsum-7944f.firebaseapp.com",
//   projectId: "ipsum-7944f",
//   storageBucket: "ipsum-7944f.appspot.com",
//   messagingSenderId: "659955552633",
//   appId: "1:659955552633:web:1f12ed186f4ba3c9429fa8"
// };


// const firebaseConfig = {
//   apiKey: "AIzaSyAvjcEmAd-pab18w08pVqOOatfCQbW4S9Q",
//   authDomain: "ipsumbd.firebaseapp.com",
//   projectId: "ipsumbd",
//   storageBucket: "ipsumbd.appspot.com",
//   messagingSenderId: "198084407693",
//   appId: "1:198084407693:web:5dddc9a9a69ce47d678dc4"
// };
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