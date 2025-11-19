import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  crearEmpleadoEquipo,
  actualizarEmpleadoEquipo,
  getEmpleadoEquipoById,
} from '../services/empleadoEquipoService';
import { getEmpleados } from '../services/empleadoService';
import { getEquipos } from '../services/equipoService';

const FormularioEmpleadoEquipo = () => {
  const [empleadoEquipo, setEmpleadoEquipo] = useState({
    empleado: "",
    equipo: "",
    tipoRol: "",
  });

  const [empleados, setEmpleados] = useState([]);
  const [equipos, setEquipos] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const ROLES = [
    { valor: 1, label: 'Líder' },
    { valor: 2, label: 'Técnico' },
    { valor: 3, label: 'Asistente' },
  ];

  useEffect(() => {
    // Cargar empleados y equipos
    getEmpleados().then((res) => setEmpleados(res.data));
    getEquipos().then((res) => setEquipos(res.data));

    // Si estamos editando, traer el registro
    if (id) {
      getEmpleadoEquipoById(id).then((res) => {
        const data = res.data;

        setEmpleadoEquipo({
          empleado: data.empleadoId ? String(data.empleadoId) : "",
          equipo: data.equipoId ? String(data.equipoId) : "",
          tipoRol: data.tipoRol ? String(data.tipoRol) : "",
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleadoEquipo({
      ...empleadoEquipo,
      [name]: value, // guardar TODO como string
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      empleado: { id: Number(empleadoEquipo.empleado) },
      equipo: { id: Number(empleadoEquipo.equipo) },
      tipoRol: Number(empleadoEquipo.tipoRol),
    };

    try {
      if (id) {
        await actualizarEmpleadoEquipo(id, payload);
      } else {
        await crearEmpleadoEquipo(payload);
      }

      navigate('/empleadoEquipos');
    } catch (error) {
      console.error('Error al guardar el empleado-equipo', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar' : 'Agregar'} Empleado - Equipo</h2>

      <form onSubmit={handleSubmit}>
        
        {/* Empleado */}
        <div>
          <label>Empleado:</label>
          <select
            name="empleado"
            value={empleadoEquipo.empleado}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar empleado...</option>
            {empleados.map((emp) => (
              <option key={emp.id} value={String(emp.id)}>
                {emp.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Equipo */}
        <div>
          <label>Equipo:</label>
          <select
            name="equipo"
            value={empleadoEquipo.equipo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar equipo...</option>
            {equipos.map((eq) => (
              <option key={eq.id} value={String(eq.id)}>
                {eq.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Rol */}
        <div>
          <label>Rol:</label>
          <select
            name="tipoRol"
            value={empleadoEquipo.tipoRol}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar rol...</option>
            {ROLES.map((r) => (
              <option key={r.valor} value={String(r.valor)}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Guardar</button>
        <button type="button" onClick={() => navigate('/empleadoEquipos')}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default FormularioEmpleadoEquipo;
