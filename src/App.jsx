import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from "react";
import ListaProductos from './components/ListaProductos';
import FormularioProducto from './components/FormularioProducto';
import { Login } from "./components/Login";
import { CambiarPassword } from "./components/CambiarPassword";
import { AdminUsuarios } from "./components/AdminUsuarios";
import Navbar from './components/Navbar';
import { MenuPrincipal } from "./components/MenuPrincipal"; // NUEVO

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
      </Routes>
    </>
  );
}

export default App;
