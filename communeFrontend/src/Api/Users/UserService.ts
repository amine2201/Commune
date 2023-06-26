import axios from 'axios';
import { User } from '../../Types/types';


const BASE_URL = 'htttp://localhost:8080/api/v1';

const userService = {
  getUsers: async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  },

  getUser: async (userId:Number) => {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    return response.data;
  },

  createUser: async (user:User) => {
    const response = await axios.post(`${BASE_URL}/users`, user);
    return response.data;
  },

  updateUser: async (userId:Number, updatedUser:User) => {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, updatedUser);
    return response.data;
  },

  deleteUser: async (userId:Number) => {
    await axios.delete(`${BASE_URL}/users/${userId}`);
  },
};

export default userService;
