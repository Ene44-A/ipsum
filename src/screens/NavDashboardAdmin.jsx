import { useContext, useState } from "react";
import { authContext } from "../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const NavDashboardAdmin = () => {

  const { askColl } = useContext(authContext);
  const [cuestiones, setCuestiones] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  // ACTUALIZACIÓN DE PREGUNTAS
  const handleSave = async (id, event) => {
    event.preventDefault();
    console.log('Submit', cuestiones[id], id);
    try {
      const askRef = doc(db, "preguntas", id);
      await updateDoc(askRef, { ask: cuestiones[id] });
      setCuestiones((prevCuestiones) => ({ ...prevCuestiones, [id]: '' }));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error) {
      console.log(error);
    }
  };

  //    CAMBIO DE ESTADO PARA MOSTRAR LA NOTIFICACIÓN
  const handleChange = (id, event) => {
    setCuestiones((prevCuestiones) => ({ ...prevCuestiones, [id]: event.target.value }));
  };

  return (
    <div>
      <div className="sidebar-sticky">
        {showAlert && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            Pregunta actualizada con éxito!
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}
        <ul className="nav flex-column col">
          <li className="nav-item">
            <span data-feather="home"></span>
            Editar Preguntas <span className="sr-only">(Nuevas)</span>
          </li>
          {askColl &&
            askColl.map((e, indice) => {
              return (
                <li className="p-4 nav-item row" key={e.id}>
                  <form onSubmit={(event) => handleSave(e.id, event)}>
                    <label htmlFor="">Pregunta {indice + 1}</label>
                    <div className="d-flex">
                      <input
                        type="text"
                        placeholder={e.ask}
                        value={cuestiones[e.id] || ''}
                        onChange={(event) => handleChange(e.id, event)}
                      />
                      <button type="submit" className="">X</button>
                    </div>
                  </form>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default NavDashboardAdmin;