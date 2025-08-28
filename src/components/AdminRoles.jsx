import { useState, useEffect } from "react";
import axios from "../services/axiosConfig"; // Axios configurado con JWT

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
      // Asegurarse que sea un array
      setRoles(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error al obtener roles:", err);
      if (err.response && err.response.status === 403) {
        setMensaje("No tiene permisos para ver los roles");
      } else {
        setMensaje("Error cargando roles");
      }
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
      if (err.response && err.response.status === 403) {
        setMensaje("No tiene permisos para crear roles");
      } else if (err.response && err.response.status === 400) {
        setMensaje("El rol ya existe");
      } else {
        setMensaje("Error creando rol");
      }
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
      if (err.response && err.response.status === 403) {
        setMensaje("No tiene permisos para eliminar roles");
      } else {
        setMensaje("Error eliminando rol");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Administración de Roles</h2>
      {mensaje && <p className="mb-2 text-red-600">{mensaje}</p>}

      <ul className="mb-4">
        {(Array.isArray(roles) ? roles : []).map((r) => (
          <li key={r.id} className="flex items-center justify-between mb-1">
            <span>{r.nombre}</span>
            <button
              className="text-white bg-red-500 px-2 py-1 rounded"
              onClick={() => handleEliminarRol(r.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleCrearRol} className="flex gap-2">
        <input
          type="text"
          placeholder="Nombre del rol"
          value={nuevoRol}
          onChange={(e) => setNuevoRol(e.target.value)}
          className="border px-2 py-1 rounded flex-1"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Crear Rol
        </button>
      </form>
    </div>
  );
}
