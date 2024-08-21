import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import Usuario from "./Usuario";
import NavBar from "./NavBar";
import { db } from "../fireBase/config";

const DetalleUsuario = () => {
  const [user, setUser] = useState(null);

  const id = useParams().id;

  useEffect(() => {
    const docRef = doc(db, "usuarios", id);
    getDoc(docRef).then((resp) => {
      setUser({ ...resp.data(), id: resp.id });
    });
  }, [id]);

  // console.log(user);


  return (
    <div className="container-fluid">
      <NavBar />
      <div className="row">
        <nav className="col-md-3 d-none d-md-block bg-light sidebar">
          <ul>
            <li>si</li>
            <li>si</li>
            <li>si</li>
          </ul>
        </nav>
        <main className="col-md-9 ml-sm-auto px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Detalles del usuario {user && user.nombre}</h1>
          </div>
          <div className="row">
            {
              user &&
              <Usuario user={user} />
            }
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetalleUsuario;
