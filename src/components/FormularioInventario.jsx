import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  crearInventario,
  actualizarInventario,
  getInventarioById,
} from '../services/inventarioService';

const FormularioInventario = () => {
  const [inventario, setInventario] = useState({
    codigo: '',
    estado: '',
    fecha: '',
    observaciones: '',
     
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getInventarioById(id).then((res) => {
        const data = res.data;
        // Asegura que la fecha se formatee correctamente para el input
        if (data.fecha) {
          data.fecha = new Date(data.fecha).toISOString().split('T')[0];
        }
        setInventario(data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setInventario({ ...inventario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await actualizarInventario(id, inventario);
      } else {
        await crearInventario(inventario);
      }
      navigate('/inventarios');
    } catch (error) {
      console.error('Error al guardar el inventario', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar' : 'Agregar'} Inventario</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Código:</label>
          <input
            name="codigo"
            placeholder="Código"
            value={inventario.codigo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Estado:</label>
          <input
            name="estado"
            placeholder="Estado (número)"
            type="number"
            value={inventario.estado}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Fecha:</label>
          <input
            name="fecha"
            type="date"
            value={inventario.fecha}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Observaciones:</label>
          <textarea
            name="observaciones"
            placeholder="Escribí alguna nota..."
            value={inventario.observaciones}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Guardar</button>
        <button type="button" onClick={() => navigate('/inventarios')}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default FormularioInventario;
