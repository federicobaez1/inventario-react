import React, { useEffect, useState } from 'react';
import { getEmpleados, eliminarEmpleado } from '../services/empleadoService';
import { useNavigate } from 'react-router-dom';

const ListaEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    const res = await getEmpleados();
    setEmpleados(res.data);
  };

  const handleEliminar = async (id) => {
    await eliminarEmpleado(id);
    cargarEmpleados();
  };

  return (
    <div>
      <h2>Lista de Empleados</h2>
      <button onClick={() => navigate('/agregar-empleado')}>Agregar Empleado</button>
      <ul>
        {empleados.map(p => (
          <li key={p.id}>
            {p.nombre} 
            <button onClick={() => navigate(`/editar-empleado/${p.id}`)}>Editar</button>
            <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaEmpleados;
