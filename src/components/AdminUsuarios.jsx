import { useState, useEffect } from "react";
import axios from "../services/axiosConfig";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ username: "", password: "" });
  const [mensaje, setMensaje] = useState("");
  const [anchorEl, setAnchorEl] = useState(null); // Menú abierto
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const res = await axios.get("/users");
      setUsuarios(res.data);
    } catch (err) {
      console.error(err);
      setMensaje("Error cargando usuarios");
    }
  };

  const handleAbrirMenu = (event, usuario) => {
    setAnchorEl(event.currentTarget);
    setUsuarioSeleccionado(usuario);
  };

  const handleCerrarMenu = () => {
    setAnchorEl(null);
    setUsuarioSeleccionado(null);
  };

  const handleCambiarPassword = async () => {
    const username = usuarioSeleccionado.username;
    const nuevaClave = prompt(`Nueva contraseña para ${username}:`);
    if (!nuevaClave) return;

    try {
      const res = await axios.put(`/users/${username}/password`, nuevaClave, {
        headers: { "Content-Type": "text/plain" },
      });
      setMensaje(res.data.mensaje || `Contraseña cambiada para ${username}`);
    } catch (err) {
      console.error(err);
      setMensaje(err.response?.data?.error || "Error al cambiar contraseña");
    } finally {
      handleCerrarMenu();
    }
  };

  const handleEliminarUsuario = async () => {
    const username = usuarioSeleccionado.username;
    if (!window.confirm(`¿Eliminar usuario ${username}?`)) return;

    try {
      const res = await axios.delete(`/users/${username}`);
      setMensaje(res.data.mensaje || `Usuario ${username} eliminado`);
      cargarUsuarios();
    } catch (err) {
      console.error(err);
      setMensaje(err.response?.data?.error || "Error eliminando usuario");
    } finally {
      handleCerrarMenu();
    }
  };

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    if (!nuevoUsuario.username || !nuevoUsuario.password) {
      setMensaje("Complete usuario y contraseña");
      return;
    }

    try {
      const res = await axios.post("/users", nuevoUsuario);
      setMensaje(res.data.mensaje || "Usuario creado");
      setNuevoUsuario({ username: "", password: "" });
      cargarUsuarios();
    } catch (err) {
      console.error(err);
      setMensaje(err.response?.data?.error || "Error creando usuario");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" mb={2}>
          Administración de Usuarios
        </Typography>

        <List>
          {usuarios.map((u) => (
            <ListItem
              key={u.id}
              secondaryAction={
                <IconButton onClick={(e) => handleAbrirMenu(e, u)}>
                  <MoreVertIcon />
                </IconButton>
              }
            >
              <ListItemText primary={u.username} />
            </ListItem>
          ))}
        </List>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCerrarMenu}>
          <MenuItem onClick={handleCambiarPassword}>Cambiar Contraseña</MenuItem>
          <MenuItem onClick={handleEliminarUsuario}>Eliminar Usuario</MenuItem>
        </Menu>

        <Box component="form" onSubmit={handleCrearUsuario} sx={{ mt: 3 }}>
          <Typography variant="h6" mb={1}>
            Crear nuevo usuario
          </Typography>
          <TextField
            label="Usuario"
            value={nuevoUsuario.username}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Contraseña"
            type="password"
            value={nuevoUsuario.password}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Crear Usuario
          </Button>
        </Box>

        <Snackbar
          open={Boolean(mensaje)}
          autoHideDuration={4000}
          onClose={() => setMensaje("")}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="info" onClose={() => setMensaje("")}>
            {mensaje}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}
