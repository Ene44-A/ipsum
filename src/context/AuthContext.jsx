/* eslint-disable react/prop-types */
import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext,  useEffect,  useState } from "react";
import { auth, db } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../firebase/config";
// import { createUserWithEmailAndPassword } from "firebase/auth";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
      console.log("error creating auth context");
    }
    return context;
  };


export function AuthProvider({children}){


  const [isRegister, setIsRegister] = useState(true);
  const [viewUser, setViewUser] = useState(true);
  const [askColl, setAskColl] = useState([]);

  const askRef = collection(db, "preguntas");
  
  useEffect(() => {
    getDocs(askRef).then((e) => {
      setAskColl(
        e.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, []);

  const handleLoginAndRegister = () => {
    setIsRegister(!isRegister)
  }

  const handleViewUser = () =>{
    setViewUser(!viewUser)
  }

  const loginWithGoogle = async () => {
    const responseGoogle = new GoogleAuthProvider();
    console.log(responseGoogle);
    return await signInWithPopup(auth, responseGoogle);
  };

    return (
        <authContext.Provider value={{isRegister, askColl, handleLoginAndRegister, viewUser, handleViewUser, loginWithGoogle}}>
          {children}
        </authContext.Provider>
      );


}