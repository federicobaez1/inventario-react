import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  crearDetalleInventario,
  actualizarDetalleInventario,
  getDetalleInventarioById,
} from '../services/detalleInventarioService';

import { getInventarios } from '../services/inventarioService';
import { getProductos } from '../services/productoService';
import { getEmpleadoEquipos } from '../services/empleadoEquipoService';
import { getDepositos } from '../services/depositoService';

const DetalleInventarioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    inventarioId: '',
    productoId: '',
    empleadoEquipoId: '',
    depositoId: '',
    cantidad: '',
    observaciones: '',
    fechaConteo: '',
    fechaRevision: '',
    estado: 1,
  });

  const [inventarios, setInventarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [empleadoEquipos, setEmpleadoEquipos] = useState([]);
  const [depositos, setDepositos] = useState([]);

  useEffect(() => {
    cargarCombos();
    if (id) cargarDetalle();
  }, [id]);

  const cargarCombos = async () => {
    const [inv, prod, empEq, depo] = await Promise.all([
      getInventarios(),
      getProductos(),
      getEmpleadoEquipos(),
      getDepositos(),
    ]);

    setInventarios(inv.data);
    setProductos(prod.data);
    setEmpleadoEquipos(empEq.data);
    setDepositos(depo.data);
  };

  const cargarDetalle = async () => {
    const res = await getDetalleInventarioById(id);
    const d = res.data;

    setForm({
      inventarioId: d.inventarioId ?? '',
      productoId: d.productoId ?? '',
      empleadoEquipoId: d.empleadoEquipoId ?? '',
      depositoId: d.depositoId ?? '',
      cantidad: d.cantidad ?? '',
      observaciones: d.observaciones ?? '',
      fechaConteo: d.fechaConteo ?? '',
      fechaRevision: d.fechaRevision ?? '',
      estado: d.estado ?? 1,
    });
  };

  const cambiar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviar = async (e) => {
    e.preventDefault();
    try {
      if (id) await actualizarDetalleInventario(id, form);
      else await crearDetalleInventario(form);

      navigate('/detalleInventarios');
    } catch (err) {
      console.error("Error al guardar detalle", err);
    }
  };

  return (
    <div>
      <h2>{id ? "Editar Detalle de Inventario" : "Nuevo Detalle de Inventario"}</h2>

      <form onSubmit={enviar}>

        {/* Inventario */}
        <label>Inventario</label>
        <select name="inventarioId" value={form.inventarioId} onChange={cambiar} required>
          <option value="">Seleccione</option>
          {inventarios.map(inv => (
            <option key={inv.id} value={inv.id}>{inv.codigo}</option>
          ))}
        </select>

        {/* Producto */}
        <label>Producto</label>
        <select name="productoId" value={form.productoId} onChange={cambiar} required>
          <option value="">Seleccione</option>
          {productos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>

        {/* EmpleadoEquipo */}
        <label>Empleado / Equipo</label>
        <select
          name="empleadoEquipoId"
          value={form.empleadoEquipoId}
          onChange={cambiar}
          required
        >
          <option value="">Seleccione</option>
          {empleadoEquipos.map(ee => (
            <option key={ee.id} value={ee.id}>
              {ee.empleadoNombre} - {ee.equipoNombre}
            </option>
          ))}
        </select>

        {/* Depósito */}
        <label>Depósito</label>
        <select name="depositoId" value={form.depositoId} onChange={cambiar} required>
          <option value="">Seleccione</option>
          {depositos.map(d => (
            <option key={d.id} value={d.id}>{d.nombre}</option>
          ))}
        </select>

        {/* Cantidad */}
        <label>Cantidad</label>
        <input
          type="number"
          name="cantidad"
          value={form.cantidad}
          onChange={cambiar}
          step="0.01"
          required
        />

        {/* Observaciones */}
        <label>Observaciones</label>
        <textarea
          name="observaciones"
          value={form.observaciones}
          onChange={cambiar}
        />

        {/* Fecha Conteo */}
        <label>Fecha de Conteo</label>
        <input
          type="date"
          name="fechaConteo"
          value={form.fechaConteo}
          onChange={cambiar}
          required
        />

        {/* Fecha Revisión */}
        <label>Fecha de Revisión</label>
        <input
          type="date"
          name="fechaRevision"
          value={form.fechaRevision}
          onChange={cambiar}
        />

        {/* Estado */}
        <label>Estado</label>
        <select name="estado" value={form.estado} onChange={cambiar}>
          <option value={1}>Activo</option>
          <option value={0}>Inactivo</option>
        </select>

        <button type="submit">Guardar</button>
        <button type="button" onClick={() => navigate('/detalleInventarios')}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default DetalleInventarioForm;
