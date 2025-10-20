// src/services/equipoService.js
import axios from './axiosConfig';

export const getEquipos = () => axios.get('/equipos');
export const getEquipoById = (id) => axios.get(`/equipos/${id}`);
export const crearEquipo = (equipo) => axios.post('/equipos', equipo);
export const actualizarEquipo = (id, equipo) => axios.put(`/equipos/${id}`, equipo);
export const eliminarEquipo = (id) => axios.delete(`/equipos/${id}`);
