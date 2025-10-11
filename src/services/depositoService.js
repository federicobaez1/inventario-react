// src/services/depositoService.js
import axios from './axiosConfig';

export const getDepositos = () => axios.get('/depositos');
export const getDepositoById = (id) => axios.get(`/depositos/${id}`);
export const crearDeposito = (deposito) => axios.post('/depositos', deposito);
export const actualizarDeposito = (id, deposito) => axios.put(`/depositos/${id}`, deposito);
export const eliminarDeposito = (id) => axios.delete(`/depositos/${id}`);
