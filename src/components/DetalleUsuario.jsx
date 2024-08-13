import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {doc, getDoc } from "firebase/firestore";
import { db } from "../fireBase/config";
import Usuario from "./Usuario";
import NavBar from "./NavBar";


const DetalleUsuario = () => {

    const [user, setUser] = useState(null);

  const id = useParams().id;

  useEffect(() => {
    const docRef = doc(db, 'usuarios', id);
    getDoc(docRef)
    .then((resp)=>{
      setUser({...resp.data(), id: resp.id});
    })
  }, [id]);

console.log(user);

    return (
        <div>
          <NavBar />
            DetalleUsuario
            {
              user &&
              <Usuario user={user} />
            }
        </div>
    );
}

export default DetalleUsuario;
