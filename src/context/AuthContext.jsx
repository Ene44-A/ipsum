/* eslint-disable react/prop-types */
import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext,  useEffect,  useState } from "react";
import { db } from "../firebase/config";
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

  const handleLoginAndRegister = () => {
    setIsRegister(!isRegister)
    if(isRegister){
      console.log('registrar ');
    }else{
      console.log('login');
    }
  }
  const handleViewUser = () =>{
    setViewUser(!viewUser)
  }

  const [askColl, setAskColl] = useState([]);
  // const [cuestion, setCuestion] = useState([]);

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




    return (
        <authContext.Provider value={{isRegister, askColl, handleLoginAndRegister, viewUser, handleViewUser}}>
          {children}
        </authContext.Provider>
      );


}