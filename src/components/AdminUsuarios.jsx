import { useState, useEffect } from "react";
import axios from "../services/axiosConfig"; // Axios con token incluido

export function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ username: "", password: "" });
  const [mensaje, setMensaje] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(null); // ID del usuario cuyo menú está abierto

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Cargar todos los usuarios
  const cargarUsuarios = async () => {
    try {
      const res = await axios.get("/users");
      setUsuarios(res.data);
    } catch (err) {
      console.error(err);
      setMensaje("Error cargando usuarios");
    }
  };

  // Cambiar contraseña de un usuario
  const handleCambiarPassword = async (username) => {
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
    }
  };

  // Eliminar un usuario
  const handleEliminarUsuario = async (username) => {
    if (!window.confirm(`¿Eliminar usuario ${username}?`)) return;

    try {
      const res = await axios.delete(`/users/${username}`);
      setMensaje(res.data.mensaje || `Usuario ${username} eliminado`);
      cargarUsuarios();
    } catch (err) {
      console.error(err);
      setMensaje(err.response?.data?.error || "Error eliminando usuario");
    }
  };

  // Crear un nuevo usuario
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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Administración de Usuarios</h2>
      {mensaje && <p className="mb-4 text-red-600">{mensaje}</p>}

      <ul className="mb-6">
        {usuarios.map((u) => (
          <li key={u.id} className="mb-2 relative">
            {u.username}{" "}
            <button
              className="ml-2 px-2 py-1 bg-gray-300 rounded"
              onClick={() => setMenuAbierto(menuAbierto === u.id ? null : u.id)}
            >
              ⋮
            </button>

            {menuAbierto === u.id && (
              <div className="absolute bg-gray-100 border p-2 mt-1 z-10">
                <button
                  className="block w-full mb-1 text-left px-2 py-1 hover:bg-gray-200"
                  onClick={() => { handleCambiarPassword(u.username); setMenuAbierto(null); }}
                >
                  Cambiar Contraseña
                </button>
                <button
                  className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                  onClick={() => { handleEliminarUsuario(u.username); setMenuAbierto(null); }}
                >
                  Eliminar Usuario
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={handleCrearUsuario} className="border-t pt-4">
        <h3 className="font-semibold mb-2">Crear nuevo usuario</h3>
        <input
          type="text"
          placeholder="Usuario"
          value={nuevoUsuario.username}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })}
          className="border p-1 mr-2"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={nuevoUsuario.password}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
          className="border p-1 mr-2"
          required
        />
        <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded">Crear Usuario</button>
      </form>
    </div>
  );
}
