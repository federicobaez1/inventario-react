import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from "react";
import ListaProductos from './components/ListaProductos';
import FormularioProducto from './components/FormularioProducto';
import { Login } from "./components/Login";
import { CambiarPassword } from "./components/CambiarPassword";
import { AdminUsuarios } from "./components/AdminUsuarios";
import Navbar from './components/Navbar';
import { MenuPrincipal } from "./components/MenuPrincipal"; 
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

function RutaProtegida({ token, children }) {
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || null);
  const navigate = useNavigate();

  const handleLogin = (token) => {
    setToken(token);
    navigate("/menu"); // REDIRIGE A MENU DESPUÉS DE LOGIN
  };

  return (
    <>
      <Navbar token={token} onLogout={() => setToken(null)} />
      <Routes>
        {/* Redirigir raíz a /login o /menu */}
        <Route path="/" element={<Navigate to={token ? "/menu" : "/login"} />} />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route
          path="/menu"
          element={
            <RutaProtegida token={token}>
              <MenuPrincipal />
            </RutaProtegida>
          }
        />

        <Route
          path="/productos"
          element={
            <RutaProtegida token={token}>
              <ListaProductos />
            </RutaProtegida>
          }
        />

        <Route
          path="/admin"
          element={
            <RutaProtegida token={token}>
              <AdminUsuarios />
            </RutaProtegida>
          }
        />

        <Route
          path="/admin-roles"
          element={
            <RutaProtegida token={token}>
              <AdminRoles />
            </RutaProtegida>
          }
        />

        <Route
          path="/agregar"
          element={
            <RutaProtegida token={token}>
              <FormularioProducto />
            </RutaProtegida>
          }
        />

        <Route
          path="/editar/:id"
          element={
            <RutaProtegida token={token}>
              <FormularioProducto />
            </RutaProtegida>
          }
        />

        <Route
          path="/cambiar-password"
          element={
            <RutaProtegida token={token}>
              <CambiarPassword />
            </RutaProtegida>
          }
        />

        <Route
          path="/depositos"
          element={
            <RutaProtegida token={token}>
              <ListaDepositos />
            </RutaProtegida>
          }
        />  

        <Route
          path="/agregar-deposito"
          element={
            <RutaProtegida token={token}>
              <FormularioDeposito />
            </RutaProtegida>
          }
        />

        <Route
          path="/editar-deposito/:id"
          element={
            <RutaProtegida token={token}>
              <FormularioDeposito />
            </RutaProtegida>
          }
        />

        <Route
          path="/equipos"
          element={
            <RutaProtegida token={token}>
              <ListaEquipos />
            </RutaProtegida>
          }
        />  

        <Route
          path="/agregar-equipo"
          element={
            <RutaProtegida token={token}>
              <FormularioEquipo />
            </RutaProtegida>
          }
        />

        <Route
          path="/editar-equipo/:id"
          element={
            <RutaProtegida token={token}>
              <FormularioEquipo />
            </RutaProtegida>
          }
        />

        <Route
          path="/inventarios"
          element={
            <RutaProtegida token={token}>
              <ListaInventarios />
            </RutaProtegida>
          }
        />  

        <Route
          path="/agregar-inventario"
          element={
            <RutaProtegida token={token}>
              <FormularioInventario />
            </RutaProtegida>
          }
        />

        <Route
          path="/editar-inventario/:id"
          element={
            <RutaProtegida token={token}>
              <FormularioInventario />
            </RutaProtegida>
          }
        />

        <Route
          path="/empleadoEquipos"
          element={
            <RutaProtegida token={token}>
              <ListaEmpleadoEquipos />
            </RutaProtegida>
          }
        />  

        <Route
          path="/agregar-empleadoEquipo"
          element={
            <RutaProtegida token={token}>
              <FormularioEmpleadoEquipo />
            </RutaProtegida>
          }
        />

        <Route
          path="/editar-empleadoEquipo/:id"
          element={
            <RutaProtegida token={token}>
              <FormularioEmpleadoEquipo />
            </RutaProtegida>
          }
        />

        <Route
          path="/empleados"
          element={
            <RutaProtegida token={token}>
              <ListaEmpleados />
            </RutaProtegida>
          }
        />  

        <Route
          path="/agregar-empleado"
          element={
            <RutaProtegida token={token}>
              <FormularioEmpleado />
            </RutaProtegida>
          }
        />

        <Route
          path="/editar-empleado/:id"
          element={
            <RutaProtegida token={token}>
              <FormularioEmpleado />
            </RutaProtegida>
          }
        />

        <Route
          path="/detalleInventarios"
          element={
            <RutaProtegida token={token}>
              <ListaDetalleInventarios />
            </RutaProtegida>
          }
        />  

        <Route
          path="/agregar-detalleInventario"
          element={
            <RutaProtegida token={token}>
              <FormularioDetalleInventario />
            </RutaProtegida>
          }
        />

        <Route
          path="/editar-detalleInventario/:id"
          element={
            <RutaProtegida token={token}>
              <FormularioDetalleInventario />
            </RutaProtegida>
          }
        />

      </Routes>
    </>
  );
}

export default App;
