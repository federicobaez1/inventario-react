import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  crearEquipo,
  actualizarEquipo,
  getEquipoById,
} from '../services/equipoService';

const FormularioEquipo = () => {
  const [equipo, setEquipo] = useState({ nombre: ''});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEquipoById(id).then((res) => setEquipo(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setEquipo({ ...equipo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await actualizarEquipo(id, equipo);
    } else {
      await crearEquipo(equipo);
    }
    navigate('/');
  };

  return (
    <div>
      <h2>{id ? 'Editar' : 'Agregar'} Equipo</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={equipo.nombre}
          onChange={handleChange}
        />
        
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default FormularioEquipo;
