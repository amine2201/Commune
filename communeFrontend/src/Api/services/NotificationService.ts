import axios from 'axios';
import { Notification } from '../../Types/types';


const BASE_URL = 'http://localhost:8080/api/v1';
const api = axios.create({
  baseURL: BASE_URL,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const notificationService = {
    getNotifications: async () => {
        const response = await api.get(`/notifications`);
        return response.data;

    },
    getNotification: async (notificationId:Number) => {
        const response = await api.get(`/notifications/${notificationId}`);
        return response.data;
    },
    createNotification: async (notification:Notification) => {
        const response = await api.post(`/notifications`, notification);
        return response.data;
    },
    updateNotification: async (notificationId:Number, updatedNotification:Notification) => {
        const response = await api.put(`/notifications/${notificationId}`, updatedNotification);
        return response.data;
    }
};
export default notificationService;
