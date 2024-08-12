/* eslint-disable react/prop-types */
import '../App.css';
import img from '../assets/image.png'
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { authContext } from "../context/AuthContext";
import Registro from './Registro'

const Register = () => {
    async function registrarUsuario(email,password, rol){
        const infoUsuario = await createUserWithEmailAndPassword(auth, email, password).then((usuarioFirebase) =>{
            return usuarioFirebase
        })
        console.log(infoUsuario);
        const docRef = await doc(db, `usuarios/${infoUsuario.user.uid}`);
        setDoc(docRef,{correo: email, rol: rol});
    }

    const {isRegister, handleLoginAndRegister} = useContext(authContext)

    // const [isRegister, setIsRegister] = useState(true);
    const [rol, setRol] = useState('usuario');
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

    console.log('Submit: ',email,password);
    console.log('is registre ', isRegister);


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 d-flex align-items-center justify-content-center" style={{background: `linear-gradient(to bottom, #E2E2E2, #F0F0F0)` }}>
                    <img src={img} alt="Your Image" className="img-fluid" />
                </div>
                <div className="col-md-6 p-5">
                    <h2 className="text-center mb-4">Regístrate a WePlot</h2>
                    <form className='p-4' action="" onSubmit={handleSubmit(registrar)}>
                        <div className="row row-cols-2">
                            <div className="form-group col">
                                <label htmlFor="nombre">Nombre*</label>
                                <input className="form-control form-control-sm" id="nombre" required type="text" {...register("nombre")} />
                            </div>
                            <div className="form-group col">
                                <label htmlFor="apellido">Apellido</label>
                                <input className="form-control form-control-sm" id="apellido" required type="text" {...register("apellido")} />
                            </div>

                            <div className="form-group col">
                                <label htmlFor="email">Email*</label>
                                <input className="form-control form-control-sm" id="email" required type="email" {...register("email")} />
                            </div>
                            <div className="form-group col">
                                <label htmlFor="telefono">Teléfono*</label>
                                <input className="form-control form-control-sm" id="telefono" required type="phone" {...register("telefono")} />
                            </div>
                            <div className="form-group col">
                                <label htmlFor="pais">País</label>
                                <input className="form-control form-control-sm" id="pais" required type="text" {...register("pais")} />
                            </div>
                        </div>
                        <div className="row row-cols-2">
                            <div className="form-group col">
                                <label htmlFor="comidaFavorita">Comida favorita</label>
                                <input className="form-control form-control-sm" id="comida" required type="text" {...register("comida")} />
                            </div>
                            <div className="form-group col">
                                <label htmlFor="artistaFavorito">Artista favorito</label>
                                <input className="form-control form-control-sm" id="artista" required type="text" {...register("artista")} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lugarFavorito">Lugar favorito</label>
                                <input className="form-control form-control-sm" id="lugar" required type="text" {...register("lugar")} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="colorFavorito">Color favorito</label>
                                <input className="form-control form-control-sm" id="color" required type="text" {...register("color")} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contraseña">Contraseña*</label>
                                <input className="form-control form-control-sm" id="contrasena" required type="password" {...register("contrasena")} />

                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmarContraseña">Confirmar contraseña*</label>
                                <input className="form-control form-control-sm" id="confiContrasena" required type="password" {...register("confiContrasena")} />
                            </div>
                            <div className="row row-cols-2 ">
                                <div className="input-group  col ">
                                    <div className="upload-btn-wrapper d-flex pt-4">
                                        <span className='item-profile'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                            </svg>
                                        </span>
                                        <div className="">
                                            <h5>Foto de perfil</h5>
                                            <p style={{fontSize:"10px", color:"grey" }}>JPG o PNG de maximo 10MB</p>
                                        </div>
                                        <input type="file" name="myfile" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fotoDePerfil">Foto de perfil</label>
                            <button type="submit" className="btn btn-primary btn-block">Unirme a WePlot</button>
                            <p className="text-center mt-3">¿Ya tienes cuenta? <a href="#">Inicia sesión aquí</a></p>
                        </div>
                    </form>
                    <button onClick={()=>{handleLoginAndRegister()}}>Iniciar Sesión</button>
                </div>
            </div>
        </div>
    );
}

export default Register;
