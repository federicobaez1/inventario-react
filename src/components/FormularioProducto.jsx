import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  crearProducto,
  actualizarProducto,
  getProductoById,
} from '../services/productoService';

const FormularioProducto = () => {
  const [producto, setProducto] = useState({ nombre: '', precio: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getProductoById(id).then((res) => setProducto(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await actualizarProducto(id, producto);
    } else {
      await crearProducto(producto);
    }
    navigate('/');
  };

  return (
    <div>
      <h2>{id ? 'Editar' : 'Agregar'} Producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={handleChange}
        />
        <input
          name="precio"
          placeholder="Precio"
          value={producto.precio}
          onChange={handleChange}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default FormularioProducto;
