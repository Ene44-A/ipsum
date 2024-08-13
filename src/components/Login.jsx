
import img from '../assets/image.png'
import { useContext} from "react";
import { useForm } from "react-hook-form";
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { authContext } from "../context/AuthContext";
// import { doc, setDoc } from "firebase/firestore";


const Login = () => {


    const {isRegister, handleLoginAndRegister} = useContext(authContext)

    const {register, handleSubmit} = useForm();


    const login = (data) => {
        if(!isRegister){
            signInWithEmailAndPassword(auth, data.email, data.contrasena)
        }
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
                            <form action="" onSubmit={handleSubmit(login)}>
                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input id="email" className="form-control" type="email" {...register("email")} />
                            </div>
                            <div className="form-group">
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
