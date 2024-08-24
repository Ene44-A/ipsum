import Login from '../logic/Login';
import { useContext } from "react";
import { authContext } from '../context/AuthContext';
import Register from '../logic/Register';


const ContainerLogin = () => {

    const {isRegister} = useContext(authContext)

    return (
        <div>
            {
                isRegister ? <Register /> : <Login />
            }
        </div>
    );
}

export default ContainerLogin;
