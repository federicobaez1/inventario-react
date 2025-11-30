// src/components/FormularioDeposito.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  crearDeposito,
  actualizarDeposito,
  getDepositoById,
} from "../services/depositoService";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack
} from "@mui/material";

const FormularioDeposito = () => {
  const [deposito, setDeposito] = useState({ nombre: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getDepositoById(id).then((res) => setDeposito(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setDeposito({ ...deposito, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!deposito.nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    if (id) {
      await actualizarDeposito(id, deposito);
    } else {
      await crearDeposito(deposito);
    }

    navigate("/depositos");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {id ? "Editar Depósito" : "Agregar Depósito"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Nombre"
                name="nombre"
                value={deposito.nombre}
                onChange={handleChange}
                required
                fullWidth
              />

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => navigate("/depositos")}
                >
                  Cancelar
                </Button>

                <Button type="submit" variant="contained">
                  Guardar
                </Button>
              </Stack>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FormularioDeposito;
