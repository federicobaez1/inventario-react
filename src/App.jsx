import { Routes, Route, Navigate } from 'react-router-dom';
import ListaProductos from './components/ListaProductos';
import FormularioProducto from './components/FormularioProducto';
import { useState } from "react";
import { Login } from "./components/Login";
import { CambiarPassword } from "./components/CambiarPassword";
import { AdminUsuarios } from "./components/AdminUsuarios";

// Componente para proteger rutas
function RutaProtegida({ token, children }) {
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || null);

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={setToken} />} />

      {/* Ruta pública */}
      <Route path="/" element={<ListaProductos />} />
      <Route path="/admin" element={<AdminUsuarios />} />

      {/* Rutas protegidas */}
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
  );
}

export default App;
