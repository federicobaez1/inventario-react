import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from "react";
import ListaProductos from './components/ListaProductos';
import FormularioProducto from './components/FormularioProducto';
import { Login } from "./components/Login";
import { CambiarPassword } from "./components/CambiarPassword";
import { AdminUsuarios } from "./components/AdminUsuarios";
 
import   {AdminRoles}   from "./components/AdminRoles";
import ListaDepositos from './components/ListaDepositos';
import FormularioDeposito from './components/FormularioDeposito';
import ListaEquipos from './components/ListaEquipos';
import FormularioEquipo from './components/FormularioEquipo';
import ListaInventarios from './components/ListaInventarios';
import FormularioInventario from './components/FormularioInventario';
import ListaEmpleadoEquipos from './components/ListaEmpleadoEquipos';
import FormularioEmpleadoEquipo from './components/FormularioEmpleadoEquipo';
import ListaEmpleados from './components/ListaEmpleados';
import FormularioEmpleado from './components/FormularioEmpleado';
import ListaDetalleInventarios from './components/ListaDetalleInventarios';
import FormularioDetalleInventario from './components/FormularioDetalleInventario';
import ImportarExcelPage from "./components/ImportarExcelPage";
import Layout from "./components/Layout";
function RutaProtegida({ token, children }) {
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || null);
  const navigate = useNavigate();

  const handleLogin = (token) => {
    setToken(token);
    navigate("/productos"); 
  };

  return (
    <>
      
      <Routes>
  {/* Redirección inicial */}
  <Route path="/" element={<Navigate to={token ? "/productos" : "/login"} />} />

  {/* Login fuera del layout */}
  <Route path="/login" element={<Login onLogin={handleLogin} />} />

  {/* Todo lo protegido va dentro del Layout */}
  <Route
    path="/"
    element={
      <RutaProtegida token={token}>
        <Layout />
      </RutaProtegida>
    }
  >
    <Route path="productos" element={<ListaProductos />} />
    <Route path="agregar" element={<FormularioProducto />} />
    <Route path="editar/:id" element={<FormularioProducto />} />

    <Route path="depositos" element={<ListaDepositos />} />
    <Route path="agregar-deposito" element={<FormularioDeposito />} />
    <Route path="editar-deposito/:id" element={<FormularioDeposito />} />

    <Route path="equipos" element={<ListaEquipos />} />
    <Route path="agregar-equipo" element={<FormularioEquipo />} />
    <Route path="editar-equipo/:id" element={<FormularioEquipo />} />

    <Route path="inventarios" element={<ListaInventarios />} />
    <Route path="agregar-inventario" element={<FormularioInventario />} />
    <Route path="editar-inventario/:id" element={<FormularioInventario />} />

    <Route path="empleadoequipos" element={<ListaEmpleadoEquipos />} />
    <Route path="agregar-empleadoEquipo" element={<FormularioEmpleadoEquipo />} />
    <Route path="editar-empleadoEquipo/:id" element={<FormularioEmpleadoEquipo />} />

    <Route path="empleados" element={<ListaEmpleados />} />
    <Route path="agregar-empleado" element={<FormularioEmpleado />} />
    <Route path="editar-empleado/:id" element={<FormularioEmpleado />} />

    <Route path="detalleInventarios" element={<ListaDetalleInventarios />} />
    <Route path="agregar-detalleInventario" element={<FormularioDetalleInventario />} />
    <Route path="editar-detalleInventario/:id" element={<FormularioDetalleInventario />} />

    <Route path="admin" element={<AdminUsuarios />} />
    <Route path="admin-roles" element={<AdminRoles />} />
    <Route path="cambiar-password" element={<CambiarPassword />} />

    <Route path="importar-excel" element={<ImportarExcelPage />} />
  </Route>
</Routes>

    </>
  );
}

export default App;
