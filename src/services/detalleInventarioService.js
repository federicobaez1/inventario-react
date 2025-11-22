// src/services/detalleInventarioService.js
import axios from './axiosConfig';

export const getDetalleInventarios = () => axios.get('/detalleInventarios');
export const getDetalleInventarioById = (id) => axios.get(`/detalleInventarios/${id}`);
export const crearDetalleInventario = (detalleInventario) => axios.post('/detalleInventarios', detalleInventario);
export const actualizarDetalleInventario = (id, detalleInventario) => axios.put(`/detalleInventarios/${id}`, detalleInventario);
export const eliminarDetalleInventario = (id) => axios.delete(`/detalleInventarios/${id}`);
