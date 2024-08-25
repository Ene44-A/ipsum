import { useContext, useState} from "react";
import { authContext } from "../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const NavDashboardAdmin = () => {

  const {askColl} = useContext(authContext)
  const [cuestion, setCuestion] = useState();

  const handleSave = async (id, event) => {
    event.preventDefault();
    console.log('Submit',cuestion, id);
      try {
        const askRef = doc(db, "preguntas", id)
        await updateDoc(askRef,{
          ask: cuestion
        })
        await setCuestion('');
      } catch (error) {
        console.log(error);
      }
  };
  // console.log(cuestion);

  return (
    <div>
      <div className="sidebar-sticky">
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
                      <input type="text" placeholder={e.ask} onChange={(event) => setCuestion(event.target.value)} />
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