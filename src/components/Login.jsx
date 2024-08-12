/* eslint-disable react/prop-types */
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
                    <div className="col-md-6">
                        <h2>Regístrate a WePlot</h2>
                        <form  action="" onSubmit={handleSubmit(login)}>
                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input id="email"  className="form-control"  type="email" {...register("email")} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña *</label>
                                <input id="contrasena" className="form-control" type="password" {...register("contrasena")} />
                            </div>
                            <button className='btn btn-primary' type="submit">Iniciar sesión</button>
                        </form>
                        <button  onClick={()=>{handleLoginAndRegister()}}>Registrar </button>
                    </div>
                </div>
            </div>
            {/* <div className="">
                <h1>Ingresar</h1>
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
                <button onClick={()=>{handleLoginAndRegister()}}>Registrar </button>
            </div> */}
        </div>
    );
}

export default Login;
