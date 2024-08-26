import '../App.css';
import img from '../assets/image.png'
import logo from '../assets/logo.png'
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { authContext } from "../context/AuthContext";
import {ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {storage} from '../firebase/config';
import ReCAPTCHA from 'react-google-recaptcha';

const Register = () => {

    //      REGISTRO DE DATOS DEL FORMULARIO
    const {register, handleSubmit} = useForm();
    //      VARIABLES GLOBALES
    const {isRegister, handleLoginAndRegister, askColl, loginWithGoogle} = useContext(authContext)

    const captcha = useRef(null);
    const [urlImg, setUrlImg] = useState(null);
    const [capchaState, setCapchaState] = useState(null);
    const [fileSave, setFileSave] = useState(null);
    const [equalPass, setEqualPass] = useState(null);
    const [rol] = useState('usuario');
    const [userGoogle] = useState(false);

    //verifica el usuario y lo toma como un objeto
    useEffect(() => {
        onAuthStateChanged(auth, (userNow) => {
        console.log(userNow);
        });
    }, []);

     //      DESESTRUCTURIN DE PREGUNTAS
    let ask1, ask2, ask3, ask4;
    for (let i = 0; i < askColl.length; i++) {
        switch (i) {
            case 0:
                ask1 = askColl[i].ask;
            break;
            case 1:
            ask2 = askColl[i].ask;
            break;
            case 2:
            ask3 = askColl[i].ask;
            break;
            case 3:
            ask4 = askColl[i].ask;
            break;
        }
    }
    //      REGISTRO DE USUAIROS DEFAULT Y ASIGNACIÓN DE INFORMACIÓN DEL PERFIL
    async function registrarUsuario(rol, urlImg,userGoogle, nombre,apellido,email,telefono,pais,pregunta1,pregunta2,pregunta3,pregunta4,contrasena){
        const infoUsuario = await createUserWithEmailAndPassword(auth, email, contrasena).then((usuarioFirebase) =>{
            return usuarioFirebase
        })
        console.log(infoUsuario);
        const docRef = await doc(db, `usuarios/${infoUsuario.user.uid}`);
        setDoc(docRef,{
            rol: rol,
            avatar: urlImg,
            userGoogle: userGoogle,
            nombre:nombre,
            apellido:apellido,
            correo: email,
            telefono:telefono,
            pais:pais,
            pregunta1:{
                ask:ask1,
                resp:pregunta1
            },pregunta2:{
                ask:ask2,
                resp:pregunta2
            },pregunta3:{
                ask:ask3,
                resp:pregunta3
            },pregunta4:{
                ask:ask4,
                resp:pregunta4
            }
        });
    }
    //      MANEJO DE ESTADOS EN CARGA DE FOTO DE AVATAR
    const fileHandle = async (e) =>{
        try {
            const archivoDic = e.target.files[0];
            const refArchivo = ref(storage,`avatar/${archivoDic.name}`)
            await uploadBytes(refArchivo, archivoDic)
            const urlImgInfo = await getDownloadURL(refArchivo)
            setUrlImg(urlImgInfo)
            setFileSave(true)
            console.log(urlImgInfo);
        } catch (error) {
            alert('Error al guardar archivo: '+error)
            setFileSave(false)
        }
    }

    //      REGISTRAR DATOS CON FORMULARIO
    const registrar = async (data) => {


        console.log('registrado ', data.email, data.contrasena);
        if(isRegister){
            if(captcha.current.getValue()){
                setCapchaState(true)
                if(data.contrasena === data.confiContrasena){
                    setEqualPass(true)
                    if(fileSave === true){
                        if (urlImg) {
                            registrarUsuario(
                              rol,
                              urlImg,
                              userGoogle,
                              data.nombre,
                              data.apellido,
                              data.email,
                              data.telefono,
                              data.pais,
                              data.pregunta1,
                              data.pregunta2,
                              data.pregunta3,
                              data.pregunta4,
                              data.contrasena
                            );
                        } else {
                            console.error("La URL de la imagen no está definida.");
                        }
                    }else{
                        setFileSave(false)
                    }
                }else{
                    setEqualPass(false)
                }
            }else{
                setCapchaState(false)
            }
        }
    }

    //      REGISTRAR DATOS DESDE GOOGLE
    const registerGoogleData = async (user) => {
        try {
            const docRefG = doc(db, `usuarios`, user.uid);
            const docSnap = await getDoc(docRefG);

            if (docSnap.exists()) {
                console.log("El usuario ya existe, no se actualizarán los datos.");
                // No hacer nada, el usuario ya está registrado
            } else {
                const userData = {
                    rol: 'usuario',
                    avatar: user.photoURL,
                    correo: user.email,
                    nombre: user.displayName,
                    userGoogle: true
                };
                await setDoc(docRefG, userData);
                console.log("Usuario registrado con éxito.");
            }
        } catch (error) {
            console.error("Error durante el inicio de sesión con Google o la operación en Firestore:", error);
        }
    }
    //      REGISTRO DE GOOGLE
    const RegisterGoogle = async () => {
        await loginWithGoogle();
        onAuthStateChanged(auth, async (userGg) => {
            if (userGg) {
                const docRefG = doc(db, `usuarios`, userGg.uid);
                const docSnap = await getDoc(docRefG);
                if (!docSnap.exists()) {
                    await registerGoogleData(userGg);
                } else {
                    console.log("El usuario ya existe, no se actualizarán los datos.");
                }
            }
        });
    }


    return (
        <div className="container-fluid">
            <div className="row">
                {/* <div className="circle-container">
                    <div className="circle">.</div>
                </div> */}
                <div className="col-md-6 d-flex align-items-center justify-content-center" style={{background: `linear-gradient(to bottom, #E2E2E2, #F0F0F0)` }}>
                    <img src={img} alt="Your Image" className="img-fluid" />
                </div>
                <div className="col-md-6 p-5">
                    <div className="cont-text">
                        <img src={logo} alt="Your Image" className="m-b" width="500" height="120"/>
                        {/* <h1 style={{fontFamily:"Geneva" }} className="text mb-4 fw-bold">Regístrate a <span className='color-text'>WePlot</span></h1> */}
                    </div>
                    <div className="container-fluid d-flex m-4">
                        <div className="google-boton col-md-5" >
                            <button onClick={()=>{RegisterGoogle()}} style={{background:"#FFF6EE", color:"#CB2229",fontWeight:"700"}} type="button" className="btn btn-light shadow d-flex justify-content-center align-items-center bold">
                            <svg className='mx-2' viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" width="16" height="16" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path></g></svg>
                                Registro con Google
                            </button>
                        </div>
                        <div className="google-facebook col-md-5" >
                            <button  style={{background:"#FFF", color:"#3464E9",fontWeight:"700"}} type="button" className="btn btn-light shadow d-flex justify-content-center align-items-center bold">
                            <svg className='mx-2' xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#3464E9" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                                Registro con Facebook
                            </button>
                        </div>
                    </div>
                    <form className='px-4' action="" onSubmit={handleSubmit(registrar,askColl)}>
                    <div className="text-center p-2 text-secondary"><p>O diligencia el formulario</p></div>
                        {
                            equalPass === false &&
                            <div className="alert alert-danger mt-2" role="alert">
                                <strong>Error:</strong> Las contraseñas no coinciden. Por favor, verifique y vuelva a intentarlo.
                            </div>
                        }
                        <div className="row row-cols-2">
                            <div className="form-group col">
                                <label htmlFor="nombre">Nombre*</label>
                                <input className="form-control form-control-sm" required type="text" {...register("nombre")} />
                            </div>
                            <div className="form-group col">
                                <label htmlFor="apellido">Apellido*</label>
                                <input className="form-control form-control-sm"  required type="text" {...register("apellido")} />
                            </div>

                            <div className="form-group col">
                                <label htmlFor="email">Email*</label>
                                <input className="form-control form-control-sm"  required type="email" {...register("email")} />
                            </div>
                            <div className="form-group col">
                                <label htmlFor="telefono">Teléfono*</label>
                                <input className="form-control form-control-sm"  required type="phone" {...register("telefono")} />
                            </div>
                            <div className="form-group col">
                                <label htmlFor="pais">País*</label>
                                <input className="form-control form-control-sm"  required type="text" {...register("pais")} />
                            </div>
                        </div>
                            <div className="row row-cols-2">
                                {
                                    askColl&&
                                    askColl.map((e)=>{
                                        return(
                                            <div className="form-group col" key={e.id}>
                                                <label htmlFor={e.aks}>{e.ask}</label>
                                                <input className="form-control form-control-sm"  required type="text" {...register(e.field)} />
                                            </div>
                                        )
                                    })
                                }
                                <div className="form-group">
                                    <label htmlFor="contraseña">Contraseña*</label>
                                    <input className="form-control form-control-sm"  required type="password" {...register("contrasena")} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmarContraseña">Confirmar contraseña*</label>
                                    <input className="form-control form-control-sm" required type="password" {...register("confiContrasena")} />
                                </div>
                                <div className="row row-cols-1">
                                    <div className="input-group  col ">
                                        <div className="upload-btn-wrapper d-flex pt-4">
                                            <span className='item-profile p-4 me-3'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#9D2B86" className="bi bi-person-circle" viewBox="0 0 16 16">
                                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                                </svg>
                                            </span>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <h5>Foto de perfil
                                                    <p style={{fontSize:"10px", color:"grey" }}>JPG o PNG de maximo 10MB</p>
                                                </h5>
                                            </div>
                                            <input type="file" required name="myfile" onChange={fileHandle} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className=""></div>
                        {
                            fileSave === true &&
                            <div className="alert alert-success mt-2" role="alert">
                                <strong>Éxito:</strong> La foto de perfil se guardó correctamente.
                            </div>
                        }{
                            fileSave === false &&
                            <div className="alert  alert-danger mt-2" role="alert">
                                <strong>Información:</strong> Por favor, seleccione un archivo para la foto de perfil.
                            </div>
                        }
                        <div className="mt-4">
                            <ReCAPTCHA ref={captcha} sitekey='6LdGfy4qAAAAAPTL8uCFemwyoC247ZQbvJWd_Ocm'/>
                        </div>
                        {
                            capchaState === false &&
                            <div className="alert alert-danger mt-2" role="alert">
                               <strong>Advertencia:</strong> Por favor, complete el reCAPTCHA para continuar.
                            </div>
                        }
                        <div className="form-group mt-4">
                            <button type="submit" className="">Unirme a WePlot</button>
                            <p className="text mt-3">¿Ya tienes cuenta? <a className='color-text' onClick={()=>{handleLoginAndRegister()}} href="#">Inicia sesión aquí</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
