import React, { useEffect, useState } from "react";
import { getDetalleInventarios, eliminarDetalleInventario } from "../services/detalleInventarioService";
import { useNavigate } from "react-router-dom";
import ExcelExportButton from "./ExcelExportButton";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Alert,
} from "@mui/material";

const ListaDetalleInventarios = () => {
  const [detalles, setDetalles] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    try {
      const res = await getDetalleInventarios();
      setDetalles(res.data);
    } catch (err) {
      console.error("Error al cargar detalle inventario", err);
      setMensaje("Error cargando detalles de inventario");
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este detalle?")) return;
    try {
      await eliminarDetalleInventario(id);
      setMensaje("Detalle eliminado correctamente");
      cargar();
    } catch (err) {
      console.error(err);
      setMensaje("Error eliminando detalle");
    }
  };

  const columnas = ["id", "producto", "cantidad", "fechaConteo"];
  const filas = detalles.map((d) => ({
    id: d.id,
    producto: d.productoNombre,
    cantidad: d.cantidad,
    fechaConteo: d.fechaConteo,
  }));

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Detalles de Inventario
      </Typography>

      {mensaje && <Alert severity="info" sx={{ mb: 2 }}>{mensaje}</Alert>}

      <Box mb={2} display="flex" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/agregar-detalleInventario")}
        >
          Agregar Detalle
        </Button>
        <ExcelExportButton columns={columnas} rows={filas} fileName="detalleInventarios.xlsx" />
      </Box>

      {detalles.length === 0 ? (
        <Typography>No hay detalles cargados.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Fecha Conteo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detalles.map((d) => (
              <TableRow key={d.id}>
                <TableCell>{d.id}</TableCell>
                <TableCell>{d.productoNombre ?? "—"}</TableCell>
                <TableCell>{d.cantidad}</TableCell>
                <TableCell>{d.fechaConteo ?? "—"}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/editar-detalleInventario/${d.id}`)}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => eliminar(d.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default ListaDetalleInventarios;
