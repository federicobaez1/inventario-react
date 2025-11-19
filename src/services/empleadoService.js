// src/services/empleadoService.js
import axios from './axiosConfig';

export const getEmpleados = () => axios.get('/empleados');
export const getEmpleadoById = (id) => axios.get(`/empleados/${id}`);
export const crearEmpleado = (empleado) => axios.post('/empleados', empleado);
export const actualizarEmpleado = (id, empleado) => axios.put(`/empleados/${id}`, empleado);
export const eliminarEmpleado = (id) => axios.delete(`/empleados/${id}`);
