// src/components/MenuPrincipal.jsx
import { Link } from "react-router-dom";

export function MenuPrincipal() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Módulos disponibles</h2>
      <ul>
        <li><Link to="/productos">Lista de Productos</Link></li>
        <li><Link to="/depositos">Lista de Depositos</Link></li>
        <li><Link to="/inventarios">Lista de Inventarios</Link></li>
        <li><Link to="/empleadoequipos">Lista de Empleado Equipo</Link></li>
        <li><Link to="/equipos">Lista de Equipos</Link></li>
        <li><Link to="/admin">Administrar Usuarios</Link></li>
        <li><Link to="/cambiar-password">Cambiar Contraseña</Link></li>
        <li><Link to="/admin-roles">Administrar Roles</Link></li>
        <li><Link to="/empleados">Lista de Empleados</Link></li>
        <li><Link to="/detalleInventarios">Lista de Detalles Inventario</Link></li>

      </ul>
    </div>
  );
}
