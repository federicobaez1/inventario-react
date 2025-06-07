// src/services/productoService.js
import axios from './axiosConfig';

export const getProductos = () => axios.get('/productos');
export const getProductoById = (id) => axios.get(`/productos/${id}`);
export const crearProducto = (producto) => axios.post('/productos', producto);
export const actualizarProducto = (id, producto) => axios.put(`/productos/${id}`, producto);
export const eliminarProducto = (id) => axios.delete(`/productos/${id}`);
