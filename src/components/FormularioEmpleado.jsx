import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  crearEmpleado,
  actualizarEmpleado,
  getEmpleadoById,
} from '../services/empleadoService';

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

const FormularioEmpleado = () => {
  const [empleado, setEmpleado] = useState({ nombre: '' });
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
    try {
      if (id) {
        await actualizarEmpleado(id, empleado);
      } else {
        await crearEmpleado(empleado);
      }
      navigate('/empleados'); // Cambié la ruta para que coincida con la lista
    } catch (err) {
      console.error("Error guardando empleado", err);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
      component={Paper}
      elevation={3}
    >
      <Typography variant="h5" align="center">
        {id ? 'Editar' : 'Agregar'} Empleado
      </Typography>

      <TextField
        label="Nombre"
        name="nombre"
        value={empleado.nombre}
        onChange={handleChange}
        fullWidth
        required
      />

      <Box display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
          Guardar
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate('/empleados')}>
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioEmpleado;
