// src/components/ListaProductos.jsx
import React, { useEffect, useState } from 'react';
import { getProductos, eliminarProducto } from '../services/productoService';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const res = await getProductos();
    setProductos(res.data);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este producto?")) return;
    await eliminarProducto(id);
    cargarProductos();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lista de Productos
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate('/agregar')}
        sx={{ mb: 2 }}
      >
        Agregar Producto
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.nombre}</TableCell>
                <TableCell>${p.precio}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/editar/${p.id}`)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleEliminar(p.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {productos.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No hay productos cargados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
};

export default ListaProductos;
