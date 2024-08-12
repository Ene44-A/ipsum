/* eslint-disable react/prop-types */
import { useState } from "react";


const Login = ({onEnviarDatos}) => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');

    const manejarEnvio = (e) => {
        e.preventDefault();
        const data = { nombre, email };
        onEnviarDatos(data); // Enviar datos al padre
        setNombre(''); // Limpiar el formulario
        setEmail('');
    };
    return (
        <div>
            Login
            <div className="">
                <form onSubmit={manejarEnvio}>
                    <label>
                        Email:
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password"  value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default Login;
