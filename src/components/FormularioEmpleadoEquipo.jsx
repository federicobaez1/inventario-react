import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  crearEmpleadoEquipo,
  actualizarEmpleadoEquipo,
  getEmpleadoEquipoById,
} from "../services/empleadoEquipoService";
import { getEmpleados } from "../services/empleadoService";
import { getEquipos } from "../services/equipoService";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";

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
    { valor: 1, label: "Líder" },
    { valor: 2, label: "Técnico" },
    { valor: 3, label: "Asistente" },
  ];

  useEffect(() => {
    getEmpleados().then((res) => setEmpleados(res.data));
    getEquipos().then((res) => setEquipos(res.data));

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
    setEmpleadoEquipo({
      ...empleadoEquipo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      empleado: { id: Number(empleadoEquipo.empleado) },
      equipo: { id: Number(empleadoEquipo.equipo) },
      tipoRol: Number(empleadoEquipo.tipoRol),
    };

    if (id) {
      await actualizarEmpleadoEquipo(id, payload);
    } else {
      await crearEmpleadoEquipo(payload);
    }

    navigate("/empleadoEquipos");
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper sx={{ p: 3, width: "400px" }}>
        <Typography variant="h5" mb={2}>
          {id ? "Editar" : "Asignar"} Empleado a Equipo
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Empleado */}
          <TextField
            select
            label="Empleado"
            name="empleado"
            fullWidth
            required
            margin="normal"
            value={empleadoEquipo.empleado}
            onChange={handleChange}
          >
            {empleados.map((emp) => (
              <MenuItem key={emp.id} value={String(emp.id)}>
                {emp.nombre}
              </MenuItem>
            ))}
          </TextField>

          {/* Equipo */}
          <TextField
            select
            label="Equipo"
            name="equipo"
            fullWidth
            required
            margin="normal"
            value={empleadoEquipo.equipo}
            onChange={handleChange}
          >
            {equipos.map((eq) => (
              <MenuItem key={eq.id} value={String(eq.id)}>
                {eq.nombre}
              </MenuItem>
            ))}
          </TextField>

          {/* Rol */}
          <TextField
            select
            label="Rol"
            name="tipoRol"
            fullWidth
            required
            margin="normal"
            value={empleadoEquipo.tipoRol}
            onChange={handleChange}
          >
            {ROLES.map((r) => (
              <MenuItem key={r.valor} value={String(r.valor)}>
                {r.label}
              </MenuItem>
            ))}
          </TextField>

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button type="submit" variant="contained">
              Guardar
            </Button>

            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/empleadoEquipos")}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default FormularioEmpleadoEquipo;
