import React, { useEffect, useState } from 'react';
import { getEmpleadoEquipos, eliminarEmpleadoEquipo } from '../services/empleadoEquipoService';
import { useNavigate } from 'react-router-dom';

const ListaEmpleadoEquipos = () => {
  const [empleadoEquipos, setEmpleadoEquipos] = useState([]);
  const navigate = useNavigate();

  // Mapeo opcional para mostrar roles legibles
  const ROLES = {
    0: "Sin rol",
    1: "Rol 1",
    2: "Rol 2",
    3: "Rol 3",
  };

  useEffect(() => {
    cargarEmpleadoEquipos();
  }, []);

  const cargarEmpleadoEquipos = async () => {
    const res = await getEmpleadoEquipos();
    setEmpleadoEquipos(res.data);
  };

  const handleEliminar = async (id) => {
    await eliminarEmpleadoEquipo(id);
    cargarEmpleadoEquipos();
  };

  return (
    <div>
      <h2>Lista de EmpleadoEquipos</h2>

      <button onClick={() => navigate('/agregar-empleadoEquipo')}>
        Agregar EmpleadoEquipo
      </button>

      <ul>
        {empleadoEquipos.map((p) => (
          <li key={p.id}>
            <strong>{p.empleadoNombre}</strong> — {p.equipoNombre}  
            {" | Rol: "}{ROLES[p.tipoRol] ?? "No asignado"}

            <button onClick={() => navigate(`/editar-empleadoEquipo/${p.id}`)}>
              Editar
            </button>

            <button onClick={() => handleEliminar(p.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaEmpleadoEquipos;
