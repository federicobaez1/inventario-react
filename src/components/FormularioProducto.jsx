// src/components/FormularioProducto.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  crearProducto,
  actualizarProducto,
  getProductoById,
} from "../services/productoService";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

const FormularioProducto = () => {
  const [producto, setProducto] = useState({ nombre: "", precio: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getProductoById(id).then((res) => setProducto(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!producto.nombre || !producto.precio) {
      alert("Completa todos los campos.");
      return;
    }

    if (id) {
      await actualizarProducto(id, producto);
    } else {
      await crearProducto(producto);
    }

    navigate("/productos");
  };

  return (
    <Box maxWidth={450} mx="auto">
      <Typography variant="h4" gutterBottom>
        {id ? "Editar" : "Agregar"} Producto
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre"
              name="nombre"
              fullWidth
              margin="normal"
              value={producto.nombre}
              onChange={handleChange}
            />

            <TextField
              label="Precio"
              name="precio"
              type="number"
              fullWidth
              margin="normal"
              value={producto.precio}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Guardar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FormularioProducto;
