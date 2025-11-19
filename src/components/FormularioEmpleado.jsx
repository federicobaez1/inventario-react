import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  crearEmpleado,
  actualizarEmpleado,
  getEmpleadoById,
} from '../services/empleadoService';

const FormularioEmpleado = () => {
  const [empleado, setEmpleado] = useState({ nombre: ''});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmpleadoById(id).then((res) => setEmpleado(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await actualizarEmpleado(id, empleado);
    } else {
      await crearEmpleado(empleado);
    }
    navigate('/');
  };

  return (
    <div>
      <h2>{id ? 'Editar' : 'Agregar'} Empleado</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={empleado.nombre}
          onChange={handleChange}
        />
        
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default FormularioEmpleado;
