import axios from 'axios';
import { User } from '../../Types/types';


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

const userService = {
  getUsers: async () => {
    const response = await api.get(`${BASE_URL}/users`);
    return response.data;
  },

  getUser: async (userId:Number) => {
    const response = await api.get(`${BASE_URL}/users/${userId}`);
    return response.data;
  },

  createUser: async (user:User) => {
    const response = await api.post(`${BASE_URL}/users`, user);
    return response.data;
  },

  updateUser: async (userId:Number, updatedUser:User) => {
    const response = await api.put(`${BASE_URL}/users/${userId}`, updatedUser);
    return response.data;
  },

  deleteUser: async (userId:Number) => {
    await api.delete(`${BASE_URL}/users/${userId}`);
  },
};

export default userService;
