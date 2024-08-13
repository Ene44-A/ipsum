import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";


const UserTableContainer = () => {

    const [userInfo, setUserInfo] = useState([]);
    const userRef = collection(db, "usuarios")


    useEffect(() => {
        getDocs(userRef).then((e)=>{
            setUserInfo(
                e.docs.map((doc)=>{
                    return {...doc.data(), id: doc.id}
                })
            )
        })

    }, [userRef]);


    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Handle</th>
                        <th scope="col">Detalle</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userInfo.map((e)=>{
                            return(

                                <tr key={e.id.slice(0, 4)}>
                                    <th scope="row">{e.id}</th>
                                    <td>{e.correo}</td>
                                    <td>{e.rol}</td>
                                    <td>@mdo</td>
                                    <td>
                                        <button className="color-text" style={{fontSize:"10px"}}>
                                            <Link to={`/usuarios/${e.id}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" style={{color:"white"}} width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                                    <path  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                                                </svg>
                                            </Link>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default UserTableContainer;
