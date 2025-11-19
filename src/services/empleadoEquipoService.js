// src/services/empleadoEquipoService.js
import axios from './axiosConfig';

export const getEmpleadoEquipos = () => axios.get('/empleadoEquipos');
export const getEmpleadoEquipoById = (id) => axios.get(`/empleadoEquipos/${id}`);
export const crearEmpleadoEquipo = (empleadoEquipo) => axios.post('/empleadoEquipos', empleadoEquipo);
export const actualizarEmpleadoEquipo = (id, empleadoEquipo) => axios.put(`/empleadoEquipos/${id}`, empleadoEquipo);
export const eliminarEmpleadoEquipo = (id) => axios.delete(`/empleadoEquipos/${id}`);
