import { useState, useEffect } from "react";
import axios from "../services/axiosConfig";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export function AdminRoles() {
  const [roles, setRoles] = useState([]);
  const [nuevoRol, setNuevoRol] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    cargarRoles();
  }, []);

  const cargarRoles = async () => {
    try {
      const res = await axios.get("/roles");
      setRoles(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error al obtener roles:", err);
      setMensaje(
        err.response?.status === 403
          ? "No tiene permisos para ver los roles"
          : "Error cargando roles"
      );
    }
  };

  const handleCrearRol = async (e) => {
    e.preventDefault();
    if (!nuevoRol) return;

    try {
      const res = await axios.post("/roles", { nombre: nuevoRol });
      if (res.status === 200 || res.status === 201) {
        setMensaje(`Rol "${nuevoRol}" creado`);
        setNuevoRol("");
        cargarRoles();
      }
    } catch (err) {
      console.error("Error creando rol:", err);
      setMensaje(
        err.response?.status === 403
          ? "No tiene permisos para crear roles"
          : err.response?.status === 400
          ? "El rol ya existe"
          : "Error creando rol"
      );
    }
  };

  const handleEliminarRol = async (idRol) => {
    if (!window.confirm("¿Eliminar este rol?")) return;

    try {
      const res = await axios.delete(`/roles/${idRol}`);
      if (res.status === 204 || res.status === 200) {
        setMensaje("Rol eliminado");
        cargarRoles();
      }
    } catch (err) {
      console.error("Error eliminando rol:", err);
      setMensaje(
        err.response?.status === 403
          ? "No tiene permisos para eliminar roles"
          : "Error eliminando rol"
      );
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Administración de Roles
      </Typography>

      {mensaje && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {mensaje}
        </Alert>
      )}

      <List>
        {roles.map((r) => (
          <ListItem key={r.id} divider>
            <ListItemText primary={r.nombre} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                color="error"
                onClick={() => handleEliminarRol(r.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Box component="form" onSubmit={handleCrearRol} mt={2} display="flex" gap={2}>
        <TextField
          label="Nombre del rol"
          variant="outlined"
          value={nuevoRol}
          onChange={(e) => setNuevoRol(e.target.value)}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Crear
        </Button>
      </Box>
    </Box>
  );
}
