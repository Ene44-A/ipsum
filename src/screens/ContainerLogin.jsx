import Login from '../components/Login';
import { useContext } from "react";
// import { useForm } from "react-hook-form";
// import { auth, db } from '../firebase/config';
// import { createUserWithEmailAndPassword} from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
import { authContext } from '../context/AuthContext';
import Register from '../components/Register';


const ContainerLogin = () => {

    const {isRegister} = useContext(authContext)

    console.log('is registre ', isRegister);




    return (
        <div>
            <h1>Container Login and Register</h1>
            {
                isRegister ? <Register /> : <Login />
            }
        </div>
    );
}

export default ContainerLogin;
