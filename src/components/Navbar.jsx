// src/components/Navbar.jsx
import { useNavigate } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode'; 


const Navbar = ({ token, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    onLogout();
    navigate("/login");
  };

  // Decodificar token y extraer el nombre de usuario
  let username = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.sub || decoded.username || "Usuario";
    } catch (e) {
      console.error("Token inválido:", e);
    }
  }

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <strong>Inventario</strong>
      {token && (
        <>
          <span style={{ marginLeft: "20px" }}>Hola, {username}</span>
          <button onClick={handleLogout} style={{ marginLeft: "20px" }}>
            Cerrar sesión
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
