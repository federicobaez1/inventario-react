import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/productos';

export const getProductos = () => axios.get(API_URL);
export const getProductoById = (id) => axios.get(`${API_URL}/${id}`);
export const crearProducto = (producto) => axios.post(API_URL, producto);
export const actualizarProducto = (id, producto) => axios.put(`${API_URL}/${id}`, producto);
export const eliminarProducto = (id) => axios.delete(`${API_URL}/${id}`);
