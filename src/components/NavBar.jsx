import { auth } from "../firebase/config";
import { getAuth, signOut } from "firebase/auth";


const NavBar = () => {

    const handleLogout = () =>{
        signOut(auth)
    }

    return (
        <div>
            NavBar
            <button onClick={()=>{handleLogout()}}>Cerrar Sesión</button>
        </div>
    );
}

export default NavBar;
