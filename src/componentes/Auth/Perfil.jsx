import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate, useParams} from 'react-router-dom';
import {getDoc, doc, updateDoc} from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebase';
import { dbCollection } from '../../firebaseConfig/collections';
import { updatePassword } from 'firebase/auth';
import {async} from '@firebase/util';

import { getAuth} from "firebase/auth";
import Swal from 'sweetalert2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFloppyDisk} from '@fortawesome/free-solid-svg-icons'
import withReactContent from 'sweetalert2-react-content';

const auth = getAuth();
const MySwal = withReactContent(Swal);

const Perfil = () =>{

    //Declaración de variables
    
    
    const [form, setForm] = useState({
        Nombre: '',
        Apellido:'',
        Edad:'',
        Email:'',
        Pais:'',
        Ciudad:'',
        Provincia:'',
        Barrio:'',
        Domicilio:'',
        Postal:'',
        Telefono:'',
        Password:'',
        Reppassword:'',
        rol:'',
        selectedOption:'',

    })

    const navigate = useNavigate();
    const {id} =useParams();

    
    //Asignar datos modificados

    const cambio = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    }

    // declarar alerta

    const alertaEditado = () => {

        Swal.fire ({
            title: 'tu archivo fue editado',
            showClass: {
                popup: 'animate_animated animate_fadeInDown'
            },
            hideClass:{
                popup: 'animate_animated animate_fadeOutUp'
            }
        })
    }

    const [mostrarError, cambiarMostrarError] = useState(false);

      const manejarBlur = (e) => {
        const mensajeError = e.target.value;
        cambiarMostrarError(mensajeError === "");
      };

    // declaramos el update

    const update = async (e) => {
        e.preventDefault();

        const user = auth.currentUser; //usuario autenticado
        const newPassword = form.Password; // Obtiene la nueva contraseña del formulario

        const usuario = doc(db, dbCollection.Usuarios, id);
        const data  = {
            Nombre: form.Nombre,
            Apellido: form.Apellido,
            Edad: form.Edad,
            Email: form.Email,
            Pais: form.Pais,
            Ciudad: form.Ciudad,
            Provincia: form.Provincia,
            Barrio: form.Barrio,
            Domicilio: form.Domicilio,
            Postal: form.Postal,
            Telefono: form.Telefono,
            Password: form.Password,
            Reppassword: form.Reppassword,
            rol: form.rol

        }
        try {
            //Actualiza password en el authentication
            await updatePassword(user, newPassword);

            //Actualiza el cloud firestore
            await updateDoc(usuario, data);
            
        
            alertaEditado();
            navigate("/");
          } catch (error) {
            // Ocurrió un error al actualizar la contraseña en Firebase.
            // Maneja el error de acuerdo a tus necesidades.
            console.error(error);
          }
       
        

    }

    //asincronismo de existencia con la bd

    const getUsuarioById = async (id) =>{
        const usuario = await getDoc(doc(db, dbCollection.Usuarios, id));
        console.log(usuario.data());
    
        if (usuario.exists()){
            setForm({
                Nombre: usuario.data().Nombre,
                Apellido: usuario.data().Apellido,
                Edad: usuario.data().Edad,
                Email: usuario.data().Email,
                Pais: usuario.data().Pais,
                Ciudad: usuario.data().Ciudad,
                Provincia: usuario.data().Provincia,
                Barrio: usuario.data().Barrio,
                Domicilio: usuario.data().Domicilio,
                Postal: usuario.data().Postal,
                Telefono: usuario.data().Telefono,
                Password: usuario.data().Password,
                Reppassword: usuario.data().Reppassword,
                rol: usuario.data().rol
                    
                    
            });
        }else{            
            console.log("no existe");
        }
    };

   
    
    //useEffect
        
    useEffect(()=>{
        getUsuarioById(id);
    }, [id])

    
    const Back = (e) => {
        navigate("/");
    }


    return(
        <div className='Container'>
            <div className='Container'>
                <form action="#" className=" h-full  relative z-2 m-2 px-10" onSubmit={update}>
                    <fieldset className="formulario-contacto__contenido">
                        <legend className="formulario-contacto__contenido__titulo text-3xl text-center mb-2 text-black" style={{fontWeight: 'bold'}}>Bienvenido {form.Nombre}</legend>
                            <h1 className="text-right px-3 mb-3 h5">
                                    {form.rol=== "admin" ?(
									<Link to="/Admin" className=' text-black' style={{fontWeight: 'bold'}}>Administrar</Link>
								) : null}
                                </h1>
                                   
                                    <div className="row my-2">
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='nombre' className="text-1 text-black" style={{fontWeight: 'bold'}}>Nombre</label>
                                            </div>
                                            <div className="col-md-12">
                                                <input 
                                                name='Nombre'
                                                value={form.Nombre} 
                                                onBlur={manejarBlur} 
                                                type="text" 
                                                className="form-control rounded-md p-1 text-black bg-gray-300 mb-2" 
                                                placeholder="Escriba su nombre" 
                                                data-input="text" 
                                                id="nombre" 
                                                onChange={cambio}/>
                                                {mostrarError && <div className="text-red-500 text-xs">Completa el campo</div>}
                                                <span className="formulario-contacto__contenido__span"></span>
                                                
                                            </div>
                                            
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='apellido' className="text-1 text-black"style={{fontWeight: 'bold'}}>Apellido</label>
                                            </div>
                                            <input 
                                            name='Apellido'
                                            value={form.Apellido}  
                                            type="text" 
                                            className="form-control rounded-md p-1 text-black bg-gray-300 mb-2" 
                                            placeholder="Escriba su apellido" 
                                            data-input="text" 
                                            id="apellido" 
                                            onChange={cambio}/>
                                            {mostrarError && <div className="text-red-500 text-xs">Completa el campo</div>}
                                            <span className="formulario-contacto__contenido__span"></span>

                                        </div>
                                    </div>
                                    <div className="row my-2"> 
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='email' className="text-1 text-black"style={{fontWeight: 'bold'}}>E-mail</label>
                                            </div>
                                            <label
                                            name='Email'
                                           >{form.Email}</label>
                                            {mostrarError && <div className="text-red-500 text-xs"style={{fontWeight: 'bold'}}>Completa el campo</div>}
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='edad' className="text-1 text-black"style={{fontWeight: 'bold'}}>Edad</label>
                                            </div>
                                            <input 
                                            name='Edad'
                                            value={form.Edad}  
                                            type="number" mode="numeric" 
                                            className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" 
                                            placeholder="Escriba su edad" 
                                            data-input="number" 
                                            id="edad" 
                                            onChange={cambio}/>
                                            {mostrarError && <div className="text-red-500 text-xs">Completa el campo</div>}
                                            <span className="formulario-contacto__contenido__span"></span>

                                        </div>
                                    
                                    </div>
                                    <div className="row my-2"> 
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='pais' className="text-1 text-black"style={{fontWeight: 'bold'}}>País de residencia</label>
                                            </div>
                                            <input 
                                            name='Pais'
                                            value={form.Pais}  
                                            type="text" 
                                            className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" 
                                            placeholder="Escriba su país" data-input="text" id="pais" 
                                            onChange={cambio}/>
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='ciudad' className="text-1 text-black"style={{fontWeight: 'bold'}}>Ciudad de residencia</label>
                                            </div>
                                            <input 
                                            name='Ciudad'
                                            value={form.Ciudad} 
                                            type="text" 
                                            className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" 
                                            placeholder="Escriba su ciudad" 
                                            data-input="text" 
                                            id="ciudad" 
                                            onChange={cambio}/>
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>
                                    </div>
                                    <div className="row my-2"> 
                                    <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='Provincia' className="text-1 text-black"style={{fontWeight: 'bold'}}>Provincia</label>
                                            </div>
                                            <input 
                                            name='Provincia'
                                            value={form.Provincia} 
                                            type="text" 
                                            className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" 
                                            placeholder="Escriba su Barrio" 
                                            data-input="text" 
                                            id="Provincia" 
                                            onChange={cambio}/>
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='Barrio' className="text-1 text-black"style={{fontWeight: 'bold'}}>Barrio</label>
                                            </div>
                                            <input 
                                            name='Barrio'
                                            value={form.Barrio} 
                                            type="text" 
                                            className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" 
                                            placeholder="Escriba su Barrio" 
                                            data-input="text" 
                                            id="Barrio" 
                                            onChange={cambio}/>
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                    <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='Domicilio' className="text-1 text-black"style={{fontWeight: 'bold'}}>Domicilio</label>
                                            </div>
                                            <input 
                                            name='Domicilio'
                                            value={form.Domicilio} 
                                            type="text" 
                                            className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" 
                                            placeholder="Escriba su Barrio" 
                                            data-input="text" 
                                            id="domicilio" 
                                            onChange={cambio}/>
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='postal' className="text-1 text-black"style={{fontWeight: 'bold'}}>Código postal</label>
                                            </div>
                                            <input 
                                            name='Postal'
                                            value={form.Postal}  
                                            type="number" 
                                            className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" 
                                            placeholder="Escriba su código postal" 
                                            data-input="number" 
                                            id="postal" 
                                            onChange={cambio}/>
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>                                
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='Telefono' className="text-1 text-black"style={{fontWeight: 'bold'}}>Teléfono</label>
                                            </div>
                                            <input 
                                            name='Telefono'
                                            value={form.Telefono}  
                                            type="text" 
                                            className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" 
                                            placeholder="Escriba su Teléfono" 
                                            data-input="text" 
                                            id="Telefono" 
                                            onChange={cambio}/>
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>
                                                                      
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='password' className="text-1 text-black"style={{fontWeight: 'bold'}}>Contraseña</label>
                                            </div>
                                            
                                            <input 
                                            name='Password'
                                            value={form.Password}  
                                            type="password" 
                                            className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" 
                                            placeholder="Escriba su contraseña" 
                                            data-input="password" 
                                            id="password" 
                                            onChange={cambio}/>
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='password' className="text-1 text-black"style={{fontWeight: 'bold'}}>Repetir contraseña</label>
                                            </div>
                                            <input 
                                            name='Reppassword'
                                            value={form.Reppassword}  
                                            className="form-control rounded-md mb-1 p-1 text-black bg-gray-300" 
                                            type="password" 
                                            placeholder="Repita su contraseña" 
                                            data-input="password" 
                                            id="reppassword" 
                                            onChange={cambio}/>
                                            <span className="formulario-contacto__contenido__span"></span>

                                        </div>

                                    </div>
                                    
                                    <div className='flex flex-col items-center p-2'>
                                        <button className="bg-black text-white rounded-md formulario-contacto__contenido__boton text-2  px-5 py-2" type="submit" formaction="./menu-administrador.html"><FontAwesomeIcon icon={faFloppyDisk} /> Guardar Cambios</button>
                                        <div className="recaptcha m-2">
                                        </div>
                                    </div>
                        </fieldset>
                        <button onClick={Back} ><label className='mx-1 text-center text-white' style={{fontWeight: 'bold' , cursor: 'pointer'}}>Back</label></button>
                </form>

            </div>
    
        
        </div>
    )
    
}

export default Perfil
