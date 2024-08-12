/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
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




    return (
        <authContext.Provider value={{}}>
          {children}
        </authContext.Provider>
      );


}