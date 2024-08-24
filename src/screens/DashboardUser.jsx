import { useEffect, useState } from "react";
import CuestionPopUpUser from "../components/cuestionPopUpUser";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import PreguntasUserItem from "../components/PreguntasUserItem";


const DashboardUser = (user) => {

    const [userInfo, setUserInfo] = useState()
    const [isPopUp, setIsPopUp] = useState()
 
    const handlePopUp = () => {
        setIsPopUp()
        console.log('funcion que cambia');

    }
    useEffect(() => {
        const docRef = doc(db, "usuarios", user.user.uid);
        getDoc(docRef).then((resp) => {
            setUserInfo({ ...resp.data(), id: resp.id });
            setIsPopUp(userInfo.registerInfo);
        })
        }, []);

        console.log('Dashboaruser Is PopUp: '+isPopUp);

    return (
        <>
        {
            userInfo &&
            <div className="">
                <div className=" p-4">
                    <div className="row">
                            <div className="col-md-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <div className="d-flex justify-content-center ">
                                            <div className="rounded-circle" style={{border:"8px solid #B1429B   "}}>
                                                <img src={userInfo.avatar} alt="User Avatar" className="img-fluid rounded-circle" style={{ width: '80px', height: '80px' }} />
                                            </div>
                                        </div>
                                        <div className="">
                                            <h3 className="mt-3">{userInfo.nombre}</h3>
                                            <h3 className="text-muted">{userInfo.apellido}</h3>
                                        </div>
                                        {/* <button className="btn btn-primary">Edit Profile</button> */}
                                    </div>
                                </div>
                                <div className="card  mb-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Información</h5>
                                        <div className="row row-cols-2">
                                            <div className="col col-4"><p>Email</p></div>
                                            <div className="col col-8 text-secondary"><p>{userInfo.correo}</p></div>
                                        </div>
                                        <div className="row row-cols-2">
                                            <div className="col col-4"><p>Pais</p></div>
                                            <div className="col col-8 text-secondary"><p>{userInfo.pais}</p></div>
                                        </div>
                                        <div className="row row-cols-2">
                                            <div className="col col-4"><p>Telefono</p></div>
                                            <div className="col col-8 text-secondary"><p>{userInfo.telefono}</p></div>
                                        </div>
                                        <p className="card-text"></p>
                                    </div>
                                </div>
                                <div className="card">
                                {
                                isPopUp &&
                                    <CuestionPopUpUser user={user.user.uid} registerInfo={userInfo.registerInfo} handlePopUp={handlePopUp} />
                                }
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Preguntas de Usuario</h5>
                                        <div className="list-group">
                                            <PreguntasUserItem info={userInfo.pregunta1}/>
                                            <PreguntasUserItem info={userInfo.pregunta2}/>
                                            <PreguntasUserItem info={userInfo.pregunta3}/>
                                            <PreguntasUserItem info={userInfo.pregunta4}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default DashboardUser;
