import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserPlus, faCirclePlus, faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import React from 'react'

function Admin() {
    return (
        <div className='row g-0'>

            <div className='col col-md-7 border border-dark rounded-3 mx-auto mb-3'>

                <form action="#" className="text-center p-4">

                    <fieldset>
                        <legend className="h3 text mb-2 text-uppercase">Menú Administrador</legend>
                        <div className='d-flex flex-column mt-3'>
                        
                            <Link to="/Mostrar" className="text-center mt-2 hover:text-gray-500"><FontAwesomeIcon icon={faUsers} style={{color: "#000000",}} /> <strong>USUARIOS</strong></Link>

                            <Link to="/Registrarse" className="my-3 hover:text-white-500"><FontAwesomeIcon icon={faUserPlus} style={{color: "#000000",}} /> <strong>REGISTRO</strong></Link>

                        </div>  
                    </fieldset>

                    <fieldset>
                        <legend className="h3 text mb-2 text-uppercase">Gestión de Productos</legend>
                        <div className='d-flex flex-column mt-3'>

                            <Link to="/CrearProductos" className="text-center mt-2 hover:text-gray-500"><FontAwesomeIcon icon={faCirclePlus} style={{color: "#000000",}} /> <strong>Crear productos</strong></Link>

                            <Link to="/MostrarProductos" className="my-3 hover:text-gray-500"><strong><FontAwesomeIcon icon={faEye} style={{color: "#000000",}} /> Editar productos</strong></Link>

                            

                        </div>
                    </fieldset>
                </form>

            </div>
        </div>
                
    )
}

export default Admin

