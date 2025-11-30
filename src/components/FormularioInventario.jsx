import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  crearInventario,
  actualizarInventario,
  getInventarioById,
} from "../services/inventarioService";
import { TextField, Button, MenuItem, Box, Typography, Paper } from "@mui/material";

const FormularioInventario = () => {
  const [inventario, setInventario] = useState({
    codigo: "",
    estado: 0,
    fecha: "",
    observaciones: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const ESTADOS = [
    { valor: 0, label: "Pendiente" },
    { valor: 1, label: "En proceso" },
    { valor: 2, label: "Finalizado" },
    { valor: 3, label: "Cancelado" },
  ];

  useEffect(() => {
    if (id) {
      getInventarioById(id).then((res) => {
        const data = res.data;
        if (data.fecha) {
          data.fecha = new Date(data.fecha).toISOString().split("T")[0];
        }
        data.estado = Number(data.estado ?? 0);
        setInventario(data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventario({
      ...inventario,
      [name]: name === "estado" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await actualizarInventario(id, inventario);
    } else {
      await crearInventario(inventario);
    }
    navigate("/inventarios");
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper sx={{ p: 3, width: "400px" }}>
        <Typography variant="h5" mb={2}>
          {id ? "Editar" : "Agregar"} Inventario
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Código"
            fullWidth
            name="codigo"
            value={inventario.codigo}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            select
            label="Estado"
            name="estado"
            fullWidth
            value={inventario.estado}
            onChange={handleChange}
            margin="normal"
          >
            {ESTADOS.map((item) => (
              <MenuItem key={item.valor} value={item.valor}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Fecha"
            type="date"
            name="fecha"
            fullWidth
            value={inventario.fecha}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Observaciones"
            name="observaciones"
            fullWidth
            value={inventario.observaciones}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/inventarios")}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default FormularioInventario;
