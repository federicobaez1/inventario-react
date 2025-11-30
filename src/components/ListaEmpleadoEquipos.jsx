import React, { useEffect, useState } from "react";
import { getEmpleadoEquipos, eliminarEmpleadoEquipo } from "../services/empleadoEquipoService";
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

const ListaEmpleadoEquipos = () => {
  const [empleadoEquipos, setEmpleadoEquipos] = useState([]);
  const navigate = useNavigate();

  const ROLES = {
    0: "Sin rol",
    1: "Líder",
    2: "Técnico",
    3: "Asistente",
  };

  useEffect(() => {
    cargarEmpleadoEquipos();
  }, []);

  const cargarEmpleadoEquipos = async () => {
    const res = await getEmpleadoEquipos();
    setEmpleadoEquipos(res.data);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar asignación?")) return;
    await eliminarEmpleadoEquipo(id);
    cargarEmpleadoEquipos();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Asignación Empleado → Equipo</Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/agregar-empleadoEquipo")}
        >
          Agregar
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Empleado</strong></TableCell>
              <TableCell><strong>Equipo</strong></TableCell>
              <TableCell><strong>Rol</strong></TableCell>
              <TableCell align="right"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {empleadoEquipos.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.empleadoNombre}</TableCell>
                <TableCell>{item.equipoNombre}</TableCell>
                <TableCell>{ROLES[item.tipoRol] ?? "No asignado"}</TableCell>

                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/editar-empleadoEquipo/${item.id}`)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton color="error" onClick={() => handleEliminar(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {empleadoEquipos.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No hay asignaciones registradas
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListaEmpleadoEquipos;
