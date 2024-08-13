import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const NavDashboardAdmin = () => {
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

  const handleSave = (id, event) => {
    event.preventDefault(); // Prevent the default form submission
    console.log(id); // This will log the ID of the item that was clicked
    // Add your save logic here
  };

  return (
    <div>
      <div className="sidebar-sticky">
        <ul className="nav flex-column col">
          <li className="nav-item">
            <span data-feather="home"></span>
            Editar Preguntas <span className="sr-only">(Nuevas)</span>
          </li>
          {askColl &&
            askColl.map((e) => {
              return (
                <li className="p-4 nav-item row" key={e.id}>
                  <form onSubmit={(event) => handleSave(e.id, event)}>
                    <label htmlFor="">{e.ask}</label>
                    <div className="d-flex">
                      <input type="text" />
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