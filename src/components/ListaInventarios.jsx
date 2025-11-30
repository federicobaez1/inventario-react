// src/components/ListaInventarios.jsx
import React, { useEffect, useState } from "react";
import { getInventarios, eliminarInventario } from "../services/inventarioService";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ListaInventarios = () => {
  const [inventarios, setInventarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarInventarios();
  }, []);

  const cargarInventarios = async () => {
    try {
      const res = await getInventarios();
      setInventarios(res.data);
    } catch (error) {
      console.error("Error cargando inventarios:", error);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar inventario?")) return;
    await eliminarInventario(id);
    cargarInventarios();
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Inventarios</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/agregar-inventario")}
        >
          Agregar
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Código</strong></TableCell>
              <TableCell align="right"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventarios.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell>{inv.id}</TableCell>
                <TableCell>{inv.codigo}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => navigate(`/editar-inventario/${inv.id}`)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleEliminar(inv.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {inventarios.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No hay inventarios registrados.
                </TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListaInventarios;
