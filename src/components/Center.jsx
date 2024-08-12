import { useState } from 'react';
import ContainerLogin from '../screens/ContainerLogin';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { AuthProvider } from "../context/AuthContext";
import { doc, getDoc } from 'firebase/firestore';
import ContainerDashboard from '../screens/ContainerDashboard';

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
            };
            setUser(userData);
            console.log('User Data final ', userData);
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

    return (
        <AuthProvider>

            {
                user ? <ContainerDashboard user={user} /> : <ContainerLogin />
            }
        </AuthProvider>
    );
}

export default Center;
