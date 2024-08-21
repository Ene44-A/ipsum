import { useEffect, useState } from "react";
import CuestionPopUpUser from "./cuestionPopUpUser";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import PreguntasUserItem from "./PreguntasUserItem";


const DashboardUser = (user) => {

    const [reqUserInfo, setReqUserInfo] = useState(true);

    const handlePopUp = () => {
        setReqUserInfo(!reqUserInfo)
    }

    const [userInfo, setUserInfo] = useState()
    useEffect(() => {
        const docRef = doc(db, "usuarios", user.user.uid);
        getDoc(docRef).then((resp) => {
            setUserInfo({ ...resp.data(), id: resp.id });
            });
            // setUserInfo(user)
        }, []);

        console.log(userInfo);


    return (
        <>
        {
            reqUserInfo &&
            <CuestionPopUpUser handlePopUp={handlePopUp} />

        }
        <div className=" p-4">
           <div className="row">
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <img src="user-avatar.jpg" alt="User Avatar" className="img-fluid rounded-circle" style={{ width: '150px', height: '150px' }} />
                            <h3 className="mt-3">{}</h3>
                            <h3 className="text-muted">{userInfo && userInfo.nombre+' '+userInfo.apellido}</h3>
                            <p className="text-muted"></p>
                            {/* <button className="btn btn-primary">Edit Profile</button> */}
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Información</h5>
                            <div className="row row-cols-2">
                                <div className="col col-4"><p>Email</p></div>
                                <div className="col col-8"><p>{userInfo && userInfo.correo}</p></div>
                            </div>
                            <div className="row row-cols-2">
                                <div className="col col-4"><p>Pais</p></div>
                                <div className="col col-8"><p>{userInfo && userInfo.pais}</p></div>
                            </div>
                            <div className="row row-cols-2">
                                <div className="col col-4"><p>Telefono</p></div>
                                <div className="col col-8"><p>{userInfo && userInfo.telefono}</p></div>
                            </div>
                            <p className="card-text"></p>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Preguntas de Usuario</h5>
                            <div className="list-group">
                                <PreguntasUserItem info={userInfo && userInfo.pregunta1}/>
                            </div>
                        </div>
                    </div>

                    {/* <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Reward Badges</h5>
                            <div className="row">
                                <div className="col-6 text-center">
                                    <p>Marketplace Expert</p>
                                </div>
                                <div className="col-6 text-center">
                                    <p>Top Buyer</p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
        </>
    );
}

export default DashboardUser;
