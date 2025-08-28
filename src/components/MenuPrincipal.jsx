// src/components/MenuPrincipal.jsx
import { Link } from "react-router-dom";

export function MenuPrincipal() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Módulos disponibles</h2>
      <ul>
        <li><Link to="/productos">Lista de Productos</Link></li>
        <li><Link to="/admin">Administrar Usuarios</Link></li>
        <li><Link to="/cambiar-password">Cambiar Contraseña</Link></li>
        <li><Link to="/admin-roles">Administrar Roles</Link></li>
      </ul>
    </div>
  );
}
