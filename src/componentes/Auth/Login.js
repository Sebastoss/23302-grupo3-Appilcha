import React, {useState} from "react";

import {Link, useNavigate} from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../firebaseConfig/firebase";
import { Alert } from "./Alert";
const auth = getAuth(firebaseApp);



function Login() {
    const [isRegistrando, setIsRegistrando] = useState(false);
    const [user, setUser]= useState ({
        email:"",
        password:"",
    })
    //const {login} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();

    const handleChange = ({target: {name, value}}) => setUser({...user, [name]: value});
    
    const submitHandler = async (e) =>{
        e.preventDefault();
        setError('')

        const email = user.email
        const password = user.password

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
        
    }
    
    return (
        <div>
            <h1>{isRegistrando ? "Registrate" : "Inicia Sesión" }</h1>
            {error && <Alert message={error} />}
            <form action="#" className="flex items-center justify-center relative z-2 m-auto" onSubmit={submitHandler}>
                <fieldset className="formulario-contacto__contenido">
                    <div className="flex flex-col">
                        <legend className="formulario-contacto__contenido__titulo text-2xl mb-2 self-center">Ingresar a mi cuenta</legend>
                        <label for='email' className="text-1">E-mail</label>
                        <input type='email'
                        name="email"
                        id='email'
                        onChange={handleChange}
                        className='formulario-contacto__contenido__nombre rounded-md p-1 text-black bg-gray-300 mb-2' placeholder='Escriba su correo electrónico' data='email'  />
                        <label for='password' className="text-1">Contraseña</label>
                        <input 
                        type='password'
                        name="password"
                        id="password"
                        onChange={handleChange}
                        className='formulario-contacto__contenido__nombre rounded-md p-1 text-black bg-gray-300 mb-2' placeholder='Escriba su contraseña' data='password' id='password' />
                        <button className="bg-black text-white rounded-md formulario-contacto__contenido__boton text-2 m-2 p-1" type="submit" formaction="./menu-administrador.html" onClick={() => setIsRegistrando(!isRegistrando)}>INGRESAR</button>
                        <Link to="/Registrarse" className="flex self-center m-2 hover:text-gray-500"><strong>REGISTRARSE</strong></Link>
                        
                        
                    </div>
                </fieldset>
                </form>

        </div>
    )
}

export default Login;