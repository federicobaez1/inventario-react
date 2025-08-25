// src/services/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para agregar el token automáticamente
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación/autorización
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Token inválido, expirado o sin permisos
      localStorage.removeItem("jwtToken");
      window.location.href = "/login"; // Redirige al login
    }
    return Promise.reject(error);
  }
);

export default instance;
