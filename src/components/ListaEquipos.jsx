import React, { useEffect, useState } from 'react';
import { getEquipos, eliminarEquipo } from '../services/equipoService';
import { useNavigate } from 'react-router-dom';

const ListaEquipos = () => {
  const [equipos, setEquipos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarEquipos();
  }, []);

  const cargarEquipos = async () => {
    const res = await getEquipos();
    setEquipos(res.data);
  };

  const handleEliminar = async (id) => {
    await eliminarEquipo(id);
    cargarEquipos();
  };

  return (
    <div>
      <h2>Lista de Equipos</h2>
      <button onClick={() => navigate('/agregar-equipo')}>Agregar Equipo</button>
      <ul>
        {equipos.map(p => (
          <li key={p.id}>
            {p.nombre} 
            <button onClick={() => navigate(`/editar-equipo/${p.id}`)}>Editar</button>
            <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaEquipos;
