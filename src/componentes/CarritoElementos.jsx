import { useContext } from 'react';
import { data } from './Datos';
import CarritoProductoContar from './CarritoProductoContar';
import React from 'react';

const CarritoElementos = () => {
    const { carrito, setCarrito } = useContext(data);

    const eliminarProducto = (id) => {
        const buscarId = carrito.find((elemento) => elemento.id === id);

        const nuevoCarrito = carrito.filter((elemento) => {
            return elemento !== buscarId;
        });

        setCarrito(nuevoCarrito);
    }

    return carrito.map((item) => {
        return (
            <div className='flex flex-row justify-between' key={item.id}>
                <h3>{item.title}</h3>
                <CarritoProductoContar producto = {item}/>
                <h4>$ {item.price * item.cantidad}</h4>
                <h3 onClick={() => eliminarProducto(item.id)}>❌</h3>
            </div>
        );
    });
};

export default CarritoElementos;