import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  crearEquipo,
  actualizarEquipo,
  getEquipoById,
} from "../services/equipoService";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

const FormularioEquipo = () => {
  const [equipo, setEquipo] = useState({ nombre: "" });
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
    navigate("/equipos"); // <-- vuelve a la lista de equipos
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" mb={2}>
          {id ? "Editar" : "Agregar"} Equipo
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="nombre"
            label="Nombre del Equipo"
            value={equipo.nombre}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Guardar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default FormularioEquipo;
