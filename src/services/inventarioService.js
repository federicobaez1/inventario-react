// src/services/inventarioService.js
import axios from './axiosConfig';

export const getInventarios = () => axios.get('/inventarios');
export const getInventarioById = (id) => axios.get(`/inventarios/${id}`);
export const crearInventario = (inventario) => axios.post('/inventarios', inventario);
export const actualizarInventario = (id, inventario) => axios.put(`/inventarios/${id}`, inventario);
export const eliminarInventario = (id) => axios.delete(`/inventarios/${id}`);
