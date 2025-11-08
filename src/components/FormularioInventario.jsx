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

  // 🔹 Definimos los estados posibles (valor numérico + etiqueta legible)
  const ESTADOS = [
    { valor: 0, label: 'Pendiente' },
    { valor: 1, label: 'En proceso' },
    { valor: 2, label: 'Finalizado' },
    { valor: 3, label: 'Cancelado' },
  ];

  useEffect(() => {
    if (id) {
      getInventarioById(id).then((res) => {
        const data = res.data;

        // Aseguramos que la fecha se formatee correctamente
        if (data.fecha) {
          data.fecha = new Date(data.fecha).toISOString().split('T')[0];
        }

        // Convertimos estado a número si viene como string
        if (data.estado !== null && data.estado !== undefined) {
          data.estado = Number(data.estado);
        }

        setInventario(data);
      });
    }
  }, [id]);

  // 🔹 Convertimos "estado" a número si es necesario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventario({
      ...inventario,
      [name]: name === 'estado' ? parseInt(value) : value,
    });
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
          <select
            name="estado"
            value={inventario.estado}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar estado...</option>
            {ESTADOS.map((e) => (
              <option key={e.valor} value={e.valor}>
                {e.label}
              </option>
            ))}
          </select>
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
