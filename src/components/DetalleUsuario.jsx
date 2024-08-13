import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {doc, getDoc } from "firebase/firestore";
import { db } from "../fireBase/config";
// import Usuario from "./Usuario";


const DetalleUsuario = () => {

    const [user, setUser] = useState(null);

  const id = useParams().id;

  useEffect(() => {
    const docRef = doc(db, 'usuarios', id);
    getDoc(docRef)
    .then((resp)=>{
      setUser({...resp.data(), id: resp.id});
    })
  }, []);

console.log(user);

    return (
        <div>
            DetalleUsuario
            <p>
                {/* <Usuario user={user} /> */}
            </p>
        </div>
    );
}

export default DetalleUsuario;
