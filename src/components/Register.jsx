import '../App.css';
import img from '../assets/image.png'
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { authContext } from "../context/AuthContext";

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
                    <div className="circle-container">
                        <div className="circle">.</div>
                    </div>
                <div className="col-md-6 d-flex align-items-center justify-content-center" style={{background: `linear-gradient(to bottom, #E2E2E2, #F0F0F0)` }}>
                    <img src={img} alt="Your Image" className="img-fluid" />
                </div>
                <div className="col-md-6 p-5">
                    <div className="cont-text">
                        <h1 style={{fontFamily:"Geneva" }} className="text mb-4 fw-bold">Regístrate a <span className='color-text'>WePlot</span></h1>
                    </div>
                    <div className="google-boton">
                        <svg viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" width="26" height="26" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path></g></svg>
                    </div>
                    <form className='px-4' action="" onSubmit={handleSubmit(registrar)}>
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
                            <div className="row row-cols-1">
                                <div className="input-group  col ">
                                    <div className="upload-btn-wrapper d-flex pt-4">
                                        <span className='item-profile p-4 me-3'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                            </svg>
                                        </span>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <h5>Foto de perfil
                                                <p style={{fontSize:"10px", color:"grey" }}>JPG o PNG de maximo 10MB</p>
                                            </h5>
                                        </div>
                                        <input type="file" name="myfile" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-4">
                            <button type="submit" className="">Unirme a WePlot</button>
                            <p className="text mt-3">¿Ya tienes cuenta? <a className='color-text' onClick={()=>{handleLoginAndRegister()}} href="#">Inicia sesión aquí</a></p>
                        </div>
                    </form>
                    {/* <button >Iniciar Sesión</button> */}
                </div>
            </div>
        </div>
    );
}

export default Register;
