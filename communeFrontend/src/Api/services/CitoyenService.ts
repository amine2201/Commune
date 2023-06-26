import axios from 'axios';
import { Citoyen } from '../../Types/types';


const BASE_URL = 'http://localhost:8080/api/v1';
const api = axios.create({
  baseURL: BASE_URL,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const CitoyenService = {
    getCitoyens: async () => {
        const response = await api.get(`/citoyens`);
        return response.data;
    },
    getCitoyen: async (citoyenId:Number) => {
        const response = await api.get(`/citoyens/${citoyenId}`);
        return response.data;
    },
    createCitoyen: async (citoyen:Citoyen) => {
        const response = await api.post(`/citoyens`, citoyen);
        return response.data;
    },
    deleteCitoyen: async (citoyenId:Number) => {
        await api.delete(`/citoyens/${citoyenId}`);
    },
    updateCitoyen: async (citoyenId:Number, updatedCitoyen:Citoyen) => {
        const response = await api.put(`/citoyens/${citoyenId}`, updatedCitoyen);
        return response.data;
    }
};
export default CitoyenService;