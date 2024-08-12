import Login from '../components/Login';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


const ContainerLogin = () => {

    async function registrarUsuario(email,password, rol){
        const infoUsuario = await createUserWithEmailAndPassword(auth, email, password).then((usuarioFirebase) =>{
            return usuarioFirebase
        })
        console.log(infoUsuario);
        const docRef = await doc(db, `usuarios/${infoUsuario.user.uid}`);
        setDoc(docRef,{correo: email, rol: rol});
    }

    const [isRegister, setIsRegister] = useState(true);
    const [rol, setRol] = useState('admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {register, handleSubmit} = useForm();

    const registrar = (data) => {
        setEmail(data.email);
        setPassword(data.contrasena);
        console.log('registrado ', data.email, data.contrasena);

        if(isRegister){
            registrarUsuario(data.email, data.contrasena, rol)
        }
    }
    const login = (data) => {
        if(isRegister){
            signInWithEmailAndPassword(auth, data.email, data.contrasena)
        }
    }

    console.log('Submit: ',email,password);




    return (
        <div>
            <h1>Login</h1>
            {
            isRegister ?
            <div className="">
                <h4>Registar</h4>
                <form  action="" onSubmit={handleSubmit(registrar)}>
                    <div >
                        <div className="">
                            <label htmlFor="email">E-mail</label>
                            <input id="email"  type="email" {...register("email")} />
                        </div>
                        <div className="">
                            <label htmlFor="contrasena">Contraseña *</label>
                            <input id="contrasena" type="password" {...register("contrasena")} />
                        </div>
                    </div>
                    <button  type="submit">Iniciar sesión</button>
                </form>
                <button onClick={()=>{setIsRegister(!isRegister)}}>Ingresar </button>
            </div>
            :
            <div className="">
                <h4>Ingresar</h4>
                <form  action="" onSubmit={handleSubmit(login)}>
                    <div >
                        <div className="">
                            <label htmlFor="email">E-mail</label>
                            <input id="email"  type="email" {...register("email")} />
                        </div>
                        <div className="">
                            <label htmlFor="contrasena">Contraseña *</label>
                            <input id="contrasena" type="password" {...register("contrasena")} />
                        </div>
                    </div>
                    <button  type="submit">Iniciar sesión</button>
                </form>
                <button onClick={()=>{setIsRegister(!isRegister)}}>Ingresar </button>
            </div>
            }
        </div>
    );
}

export default ContainerLogin;
