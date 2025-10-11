import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  crearDeposito,
  actualizarDeposito,
  getDepositoById,
} from '../services/depositoService';

const FormularioDeposito = () => {
  const [deposito, setDeposito] = useState({ nombre: ''});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getDepositoById(id).then((res) => setDeposito(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setDeposito({ ...deposito, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await actualizarDeposito(id, deposito);
    } else {
      await crearDeposito(deposito);
    }
    navigate('/');
  };

  return (
    <div>
      <h2>{id ? 'Editar' : 'Agregar'} Deposito</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={deposito.nombre}
          onChange={handleChange}
        />
        
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default FormularioDeposito;
