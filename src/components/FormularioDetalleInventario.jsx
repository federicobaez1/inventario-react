import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  crearDetalleInventario,
  actualizarDetalleInventario,
  getDetalleInventarioById,
} from "../services/detalleInventarioService";
import { getInventarios } from "../services/inventarioService";
import { getProductos } from "../services/productoService";
import { getEmpleadoEquipos } from "../services/empleadoEquipoService";
import { getDepositos } from "../services/depositoService";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";

const DetalleInventarioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    inventarioId: "",
    productoId: "",
    empleadoEquipoId: "",
    depositoId: "",
    cantidad: "",
    observaciones: "",
    fechaConteo: "",
    fechaRevision: "",
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
      inventarioId: d.inventarioId ?? "",
      productoId: d.productoId ?? "",
      empleadoEquipoId: d.empleadoEquipoId ?? "",
      depositoId: d.depositoId ?? "",
      cantidad: d.cantidad ?? "",
      observaciones: d.observaciones ?? "",
      fechaConteo: d.fechaConteo
        ? new Date(d.fechaConteo).toISOString().split("T")[0]
        : "",
      fechaRevision: d.fechaRevision
        ? new Date(d.fechaRevision).toISOString().split("T")[0]
        : "",
      estado: d.estado ?? 1,
    });
  };

  const cambiar = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "estado" ? Number(value) : value,
    });
  };

  const enviar = async (e) => {
    e.preventDefault();
    try {
      if (id) await actualizarDetalleInventario(id, form);
      else await crearDetalleInventario(form);
      navigate("/detalleInventarios");
    } catch (err) {
      console.error("Error al guardar detalle", err);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <h2>{id ? "Editar Detalle de Inventario" : "Nuevo Detalle de Inventario"}</h2>
      <form onSubmit={enviar}>

        {/* Inventario */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="inventario-label">Inventario</InputLabel>
          <Select
            labelId="inventario-label"
            name="inventarioId"
            value={form.inventarioId}
            onChange={cambiar}
            required
          >
            {inventarios.map((inv) => (
              <MenuItem key={inv.id} value={inv.id}>
                {inv.codigo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Producto */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="producto-label">Producto</InputLabel>
          <Select
            labelId="producto-label"
            name="productoId"
            value={form.productoId}
            onChange={cambiar}
            required
          >
            {productos.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* EmpleadoEquipo */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="empleado-equipo-label">Empleado / Equipo</InputLabel>
          <Select
            labelId="empleado-equipo-label"
            name="empleadoEquipoId"
            value={form.empleadoEquipoId}
            onChange={cambiar}
            required
          >
            {empleadoEquipos.map((ee) => (
              <MenuItem key={ee.id} value={ee.id}>
                {ee.empleadoNombre} - {ee.equipoNombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Depósito */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="deposito-label">Depósito</InputLabel>
          <Select
            labelId="deposito-label"
            name="depositoId"
            value={form.depositoId}
            onChange={cambiar}
            required
          >
            {depositos.map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Cantidad */}
        <TextField
          fullWidth
          margin="normal"
          type="number"
          name="cantidad"
          label="Cantidad"
          value={form.cantidad}
          onChange={cambiar}
          required
          inputProps={{ step: "0.01" }}
        />

        {/* Observaciones */}
        <TextField
          fullWidth
          margin="normal"
          label="Observaciones"
          name="observaciones"
          value={form.observaciones}
          onChange={cambiar}
          multiline
          rows={3}
        />

        {/* Fecha Conteo */}
        <TextField
          fullWidth
          margin="normal"
          type="date"
          name="fechaConteo"
          label="Fecha de Conteo"
          value={form.fechaConteo}
          onChange={cambiar}
          InputLabelProps={{ shrink: true }}
          required
        />

        {/* Fecha Revisión */}
        <TextField
          fullWidth
          margin="normal"
          type="date"
          name="fechaRevision"
          label="Fecha de Revisión"
          value={form.fechaRevision}
          onChange={cambiar}
          InputLabelProps={{ shrink: true }}
        />

        {/* Estado */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="estado-label">Estado</InputLabel>
          <Select
            labelId="estado-label"
            name="estado"
            value={form.estado}
            onChange={cambiar}
          >
            <MenuItem value={1}>Contado</MenuItem>
            <MenuItem value={0}>No contado</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/detalleInventarios")}
          >
            Cancelar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default DetalleInventarioForm;
