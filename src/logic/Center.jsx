import { useState } from 'react';
import ContainerLogin from '../screens/ContainerLogin';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { AuthProvider } from "../context/AuthContext";
import { doc, getDoc } from 'firebase/firestore';
import ContainerDashboard from '../screens/ContainerDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetalleUsuario from '../components/DetalleUsuario';
import DashboardAdmin from '../screens/DashboardAdmin';

const Center = () => {

    const [user, setUser] = useState(null);

    async function getRol(uid) {
        const docRef = doc(db, `usuarios/${uid}`);
        const doc62 = await getDoc(docRef);
        const infoDoc = doc62.data().rol;
        return infoDoc
    }
    function setUserWithFirebaseAndRol(usuarioFirebase){
        getRol(usuarioFirebase.uid).then((rol)=>{
            const userData = {
                uid: usuarioFirebase.uid,
                email: usuarioFirebase.email,
                rol: rol,
                avatar:usuarioFirebase.avatar
            };
            setUser(userData);
            // console.log('User Data final ', userData);
        });
    }
    onAuthStateChanged(auth, (usuarioFirebase)=>{
        if(usuarioFirebase){
            if(!user){
                setUserWithFirebaseAndRol(usuarioFirebase)
            }
        }else{
            setUser(null);
        }
    });

    console.log('usuario actual: ',user);






    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element=
                    {
                        user ? <ContainerDashboard user={user} /> : <ContainerLogin />
                    } />
                    <Route path="/usuarios/:id" element={<DetalleUsuario />} />
                    <Route path="/" element={<DashboardAdmin />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default Center;
