import { useState, useEffect } from "react";

export function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ username: "", password: "" });
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/users");
      const data = await res.json();
      setUsuarios(data);
    } catch {
      setMensaje("Error cargando usuarios");
    }
  };

  const handleCambiarPassword = async (username) => {
    const nuevaClave = prompt(`Nueva contraseña para ${username}:`);
    if (!nuevaClave) return;

    try {
      const res = await fetch(`http://localhost:8080/auth/users/${username}/password`, {
        method: "PUT",
        headers: { "Content-Type": "text/plain" },
        body: nuevaClave,
      });
      if (res.ok) {
        setMensaje(`Contraseña cambiada para ${username}`);
      } else {
        setMensaje(`Error al cambiar contraseña para ${username}`);
      }
    } catch {
      setMensaje("Error en la petición");
    }
  };

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    if (!nuevoUsuario.username || !nuevoUsuario.password) {
      setMensaje("Complete usuario y contraseña");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/auth/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });
      if (res.ok) {
        setMensaje("Usuario creado");
        setNuevoUsuario({ username: "", password: "" });
        cargarUsuarios();
      } else {
        const text = await res.text();
        setMensaje(text || "Error creando usuario");
      }
    } catch {
      setMensaje("Error en la petición");
    }
  };

  return (
    <div>
      <h2>Administración de Usuarios</h2>
      {mensaje && <p>{mensaje}</p>}

      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            {u.username}{" "}
            <button onClick={() => handleCambiarPassword(u.username)}>
              Cambiar Contraseña
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleCrearUsuario}>
        <h3>Crear nuevo usuario</h3>
        <input
          type="text"
          placeholder="Usuario"
          value={nuevoUsuario.username}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={nuevoUsuario.password}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
          required
        />
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
}
