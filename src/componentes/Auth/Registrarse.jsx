import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {collection, addDoc, getFirestore} from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebase';
import {async} from '@firebase/util';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Container } from 'react-bootstrap';
import firebaseApp from '../../firebaseConfig/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {doc, setDoc} from "firebase/firestore";
const auth = getAuth (firebaseApp);
const firestore = getFirestore(firebaseApp);
const MySwal = withReactContent(Swal);

function Registrarse(){
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [edad, setEdad] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [pais, setPais] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [postal, setPostal] = useState('');
    const [reppassword, setReppassword] = useState('');

    const navigate = useNavigate();
    //referenciar db
    const usuariosCollection = collection(db, "Usuarios");

    //Alerta

    const alertCreacion = () => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tus datos fueron guardados correctamente ',
            showConfirmButton: false,
            timer: 1500
        })

    }

    const alertIncompleto = () => {
        Swal.fire({
            icon: 'error',
            title: 'Completa todos los campos',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })

    }

    const alertPassword = () => {
        Swal.fire({
            icon: 'error',
            title: 'Password Erroneo',
            text: 'El password no coincide!',
            footer: '<a href="">Why do I have this issue?</a>'
          })

    }

     //Expresiones Regulares
     const expresiones = {
        usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{4,12}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/ // 7 a 14 numeros.
    }

    //Asincronismo

    const nuevo = async (e) => {
        e.preventDefault();

        if (nombre ==="" || apellido ==="" || email ==="" || password ==="" || edad ==="" || pais ==="" || ciudad ==="" || domicilio ==="" || postal ===""|| reppassword ===""){
            alertIncompleto();
            if (password.length>0){
                if(password !== reppassword){
                    alertPassword();  
                }
            }
        }
       
        else{
            const infoUsuario = await createUserWithEmailAndPassword(auth, email, password)
            .then((usuarioFirebase) =>{
                return usuarioFirebase;

            });
            console.log(infoUsuario.user.uid);
            //await addDoc(usuariosCollection, {Nombre: nombre, Apellido: apellido,  Email: email, Password: password, Edad: edad, Pais: pais, Ciudad: ciudad, Domicilio: domicilio, Postal: postal, Reppassword: reppassword, rol: 'user'});
            const docuRef = doc(firestore, `Usuarios/${infoUsuario.user.uid}`);
            setDoc(docuRef, { Nombre: nombre, Apellido: apellido,  Email: email, Password: password, Edad: edad, Pais: pais, Ciudad: ciudad, Domicilio: domicilio, Postal: postal, Reppassword: reppassword, rol: 'user' });
            alertCreacion();
            navigate("/LogIn");
    

        }

      

      
    }

    
    const [usuarioValido, cambiarUsuarioValido] = useState(false);

   

    const [mostrarError, cambiarMostrarError] = useState(false);

      const manejarBlur = (e) => {
        const mensajeError = e.target.value;
        cambiarMostrarError(mensajeError === "");
      };
      
    return (

        <div className='Container'>
            <div className='Container'>
                <form action="#" className=" h-full  relative z-2 m-2 px-10" onSubmit={nuevo}>
                    <fieldset className="formulario-contacto__contenido">
                        <legend className="formulario-contacto__contenido__titulo text-3xl text-center mb-2">Formulario de registro</legend>
                                    <div className="row my-2">
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='nombre' className="text-1">Nombre</label>
                                            </div>
                                            <div className="col-md-12">
                                                <input 
                                                value={nombre} 
                                                onBlur={manejarBlur} 
                                                type="text" 
                                                className="form-control rounded-md p-1 text-black bg-gray-300 mb-2" 
                                                placeholder="Escriba su nombre" 
                                                data-input="text" 
                                                id="nombre" 
                                                onChange={(e)=>setNombre(e.target.value)}
                                                expresionRegular={expresiones.nombre}/>
                                                {mostrarError && <div className="text-red-500 text-xs">Completa el campo</div>}
                                                <span className="formulario-contacto__contenido__span"></span>
                                                
                                            </div>
                                            
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='apellido' className="text-1">Apellido</label>
                                            </div>
                                            <input value={apellido}  type="text" className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" placeholder="Escriba su apellido" data-input="text" id="apellido" onChange={(e)=>setApellido(e.target.value)}/>
                                            {mostrarError && <div className="text-red-500 text-xs">Completa el campo</div>}
                                            <span className="formulario-contacto__contenido__span"></span>

                                        </div>
                                    </div>
                                    <div className="row my-2"> 
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='email' className="text-1">E-mail</label>
                                            </div>
                                            <input value= {email} type="email" className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" placeholder="Escriba su correo electrónico" data-input="email" id="email" onChange={(e)=>setEmail(e.target.value)}/>
                                            {mostrarError && <div className="text-red-500 text-xs">Completa el campo</div>}
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='edad' className="text-1">Edad</label>
                                            </div>
                                            <input value={edad}  type="number" mode="numeric" className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" placeholder="Escriba su edad" data-input="number" id="edad" onChange={(e)=>setEdad(e.target.value)}/>
                                            {mostrarError && <div className="text-red-500 text-xs">Completa el campo</div>}
                                            <span className="formulario-contacto__contenido__span"></span>

                                    
                                </div>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" name="terminos" id="terminos"/> Aceptar los términos y condiciones
                                </label>
                            </div>
                            <div className='flex flex-col items-center p-2'>
                                <button className="bg-black text-white rounded-md formulario-contacto__contenido__boton text-2 m-2 px-5" type="submit" formaction="./menu-administrador.html">REGISTRAR</button>
                                <div className="recaptcha m-2">
                                </div>
                            </div>
                </fieldset>
            </form>
    </div>
    </div>
    );
}
  
export default Registrarse;
