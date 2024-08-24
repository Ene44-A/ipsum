import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import Usuario from "../logic/Usuario";
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
        {
          user &&
          <div className="row">
            <nav className="col-md-3 d-none d-md-block bg-light sidebar">
                <div className="d-flex m-2 justify-content-center align-items-center">
                    <div className="rounded-circle" style={{border:"8px solid #B1429B   "}}>
                        <img src={user.avatar} alt="User Avatar" className="img-fluid rounded-circle" style={{ width: '180px', height: '180px' }} />
                    </div>
                </div>
                <div className="m-4 d-flex justify-content-center">
                    <h4 style={{color:'grey'}}>{user.nombre+' '+user.apellido}</h4>
                </div>
            </nav>
            <main className="col-md-9 ml-sm-auto px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Detalles del usuario {user && user.nombre}</h1>
              </div>
              <div className="row">
              <Usuario user={user} />
          </div>
        </main>
      </div>
      }
    </div>
  );
};

export default DetalleUsuario;
