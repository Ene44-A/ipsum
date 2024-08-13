/* eslint-disable react/prop-types */
import { createContext, useContext,  useState } from "react";
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
  // const handle

    return (
        <authContext.Provider value={{isRegister, handleLoginAndRegister, viewUser, handleViewUser}}>
          {children}
        </authContext.Provider>
      );


}