import React, { useEffect, useState } from 'react';
import { getDepositos, eliminarDeposito } from '../services/depositoService';
import { useNavigate } from 'react-router-dom';

const ListaDepositos = () => {
  const [depositos, setDepositos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarDepositos();
  }, []);

  const cargarDepositos = async () => {
    const res = await getDepositos();
    setDepositos(res.data);
  };

  const handleEliminar = async (id) => {
    await eliminarDeposito(id);
    cargarDepositos();
  };

  return (
    <div>
      <h2>Lista de Depositos</h2>
      <button onClick={() => navigate('/agregar-deposito')}>Agregar Deposito</button>
      <ul>
        {depositos.map(p => (
          <li key={p.id}>
            {p.nombre} 
            <button onClick={() => navigate(`/editar-deposito/${p.id}`)}>Editar</button>
            <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaDepositos;
