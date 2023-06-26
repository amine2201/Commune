import axios from 'axios';
import { userType } from '../../Types/types';
const api = axios.create({baseURL: 'http://localhost:8080/api/v1'},);
export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
}
export const getUser = async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
}
export const createUser = async (user: userType) => {    
    const response = await api.post('/users', user);
    return response.data;
}
export const updateUser = async (id: string, user: userType) => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
}
export const deleteUser = async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
}



