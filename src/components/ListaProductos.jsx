import React, { useEffect, useState } from 'react';
import { getProductos, eliminarProducto } from '../services/productoService';
import { useNavigate } from 'react-router-dom';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const res = await getProductos();
    setProductos(res.data);
  };

  const handleEliminar = async (id) => {
    await eliminarProducto(id);
    cargarProductos();
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <button onClick={() => navigate('/agregar')}>Agregar Producto</button>
      <ul>
        {productos.map(p => (
          <li key={p.id}>
            {p.nombre} - {p.precio}
            <button onClick={() => navigate(`/editar/${p.id}`)}>Editar</button>
            <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;
