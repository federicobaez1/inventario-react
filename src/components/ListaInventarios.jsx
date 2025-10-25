import React, { useEffect, useState } from 'react';
import { getInventarios, eliminarInventario } from '../services/inventarioService';
import { useNavigate } from 'react-router-dom';

const ListaInventarios = () => {
  const [inventarios, setInventarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarInventarios();
  }, []);

  const cargarInventarios = async () => {
    const res = await getInventarios();
    setInventarios(res.data);
  };

  const handleEliminar = async (id) => {
    await eliminarInventario(id);
    cargarInventarios();
  };

  return (
    <div>
      <h2>Lista de Inventarios</h2>
      <button onClick={() => navigate('/agregar-inventario')}>Agregar Inventario</button>
      <ul>
        {inventarios.map(p => (
          <li key={p.id}>
            {p.codigo} 
            <button onClick={() => navigate(`/editar-inventario/${p.id}`)}>Editar</button>
            <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaInventarios;
