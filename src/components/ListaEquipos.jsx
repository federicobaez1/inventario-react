import React, { useEffect, useState } from "react";
import { getEquipos, eliminarEquipo } from "../services/equipoService";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ListaEquipos = () => {
  const [equipos, setEquipos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarEquipos();
  }, []);

  const cargarEquipos = async () => {
    const res = await getEquipos();
    setEquipos(res.data);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar equipo?")) return;
    await eliminarEquipo(id);
    cargarEquipos();
  };

  return (
    <Box>
      {/* Título + Botón */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Equipos</Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/agregar-equipo")}
        >
          Agregar Equipo
        </Button>
      </Box>

      {/* Tabla */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell align="right"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {equipos.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.nombre}</TableCell>

                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/editar-equipo/${p.id}`)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton color="error" onClick={() => handleEliminar(p.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {equipos.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No hay equipos registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListaEquipos;
