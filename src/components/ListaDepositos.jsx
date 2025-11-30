// src/components/ListaDepositos.jsx
import React, { useEffect, useState } from "react";
import { getDepositos, eliminarDeposito } from "../services/depositoService";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ListaDepositos = () => {
  const [depositos, setDepositos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarDepositos();
  }, []);

  const cargarDepositos = async () => {
    const res = await getDepositos();
    setDepositos(res.data);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este depósito?")) return;
    await eliminarDeposito(id);
    cargarDepositos();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lista de Depósitos
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => navigate("/agregar-deposito")}
      >
        Agregar Depósito
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell align="right"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {depositos.map((d) => (
              <TableRow key={d.id}>
                <TableCell>{d.nombre}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/editar-deposito/${d.id}`)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleEliminar(d.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {depositos.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No hay depósitos cargados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListaDepositos;
