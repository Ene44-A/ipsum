/* eslint-disable react/prop-types */

import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";

const Usuario = ({user}) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [role, setRole] = useState('usuario');

    const handleRole = () => {
        setIsAdmin(!isAdmin)
        console.log(isAdmin);
        if(isAdmin){
            setRole('usuario')
            console.log('usuario');
        }else{
            setRole('admin')
            console.log('admin');
        }
    }
    console.log('is admin: ',isAdmin, 'role: ',role);

    const handleSave = async(e) => {
        e.preventDefault()
        try {
            const roleRef = doc(db, 'usuarios', user.id)
            await updateDoc(roleRef,{
                rol:role
            })
        } catch (error) {
            console.log(error);
        }
        console.log(user);
    }

  return (
    <div className="container">
       <div className="card">
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h4 style={{color:'grey'}}>{user.nombre+' '+user.apellido}</h4>
                    <p style={{color:'grey'}}>Rol: {user.rol}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p style={{color:'grey'}} className="card-title">{user.correo}</p>
                    <p style={{color:'grey'}}>Tel: {user.telefono}</p>
                </div>
                <div className="row row-cols-1 p-2 d-flex justify-content-center border rounded m-2">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#Pregunta</th>
                                <th>#Respuesta</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.pregunta1.ask}</td>
                                <td>{user.pregunta1.resp}</td>
                            </tr>
                            <tr>
                                <td>{user.pregunta2.ask}</td>
                                <td>{user.pregunta2.resp}</td>
                            </tr>
                            <tr>
                                <td>{user.pregunta3.ask}</td>
                                <td>{user.pregunta3.resp}</td>
                            </tr>
                            <tr>
                                <td>{user.pregunta4.ask}</td>
                                <td>{user.pregunta4.resp}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="card-text"></p>
                <div className="d-flex justify-content-end">
                    <div className="me-4">
                        <button onClick={()=>handleRole()} >quitar {role}</button>
                    </div>
                    <form action="" onSubmit={(e)=>handleSave(e)}>
                        <button>Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Usuario;
