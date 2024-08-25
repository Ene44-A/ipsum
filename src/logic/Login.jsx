
import img from '../assets/image.png'
import { useContext} from "react";
import { useForm } from "react-hook-form";
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { authContext } from "../context/AuthContext";


const Login = () => {

    const {isRegister, handleLoginAndRegister, loginWithGoogle} = useContext(authContext)

    const {register, handleSubmit} = useForm();


    const login = (data) => {
        if(!isRegister){
            signInWithEmailAndPassword(auth, data.email, data.contrasena)
        }
    }
    //      REGISTRAR CON GOOGLE
    const loginGoogle = () => {
        loginWithGoogle()
    }



    console.log('is registre ', isRegister);
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 d-flex align-items-center justify-content-center" style={{background: `linear-gradient(to bottom, #E2E2E2, #F0F0F0)` }}>
                        <img src={img} alt="Your Image" className="img-fluid" />
                    </div>
                    <div className="col-md-6 ">
                        <div className="form-container d-flex justify-content-center align-items-center h-100">
                        <div>
                            <h2>Regístrate a WePlot</h2>
                            <div className="">
                                <div className="container-fluid d-flex m-4">
                                    <div className="google-boton col-md-5" >
                                        <button onClick={()=>{loginGoogle()}} style={{background:"#FFF6EE", color:"#CB2229",fontWeight:"700"}} type="button" className="btn btn-light shadow d-flex justify-content-center align-items-center bold">
                                        <svg className='mx-2' viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" width="16" height="16" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path></g></svg>
                                            Google
                                        </button>
                                    </div>
                                    <div className="google-facebook col-md-5" >
                                        <button  style={{background:"#FFF", color:"#3464E9",fontWeight:"700"}} type="button" className="btn btn-light shadow d-flex justify-content-center align-items-center bold">
                                        <svg className='mx-2' xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#3464E9" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                                            Facebook
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <form action="" onSubmit={handleSubmit(login)}>
                            <div className="form-group my-2">
                                <label htmlFor="email">Email *</label>
                                <input id="email" className="form-control" type="email" {...register("email")} />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="password">Contraseña *</label>
                                <input id="contrasena" className="form-control" type="password" {...register("contrasena")} />
                            </div>
                            <div className="d-flex">
                                <button className='color-text mt-4'style={{color:"white"}} type="submit">Iniciar sesión</button>
                                <a className='color-text mt-4  mx-4 'style={{cursor: "pointer"}} onClick={()=>{handleLoginAndRegister()}}>Registrar </a>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
