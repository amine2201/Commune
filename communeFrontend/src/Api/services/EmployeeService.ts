import axios from 'axios';
import { Employee } from '../../Types/types';



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

const EmployeeService = {
    getEmployees: async () => {
        const response = await api.get(`/employees`);
        return response.data;
    },
    getEmployeeById: async (employeeId:Number) => {
        const response = await api.get(`/employees/${employeeId}`);
        return response.data;
    },
    createEmployee: async (employee:Employee) => {
        const response = await api.post(`/employees`, employee);
        return response.data;
    },
    deleteEmployee: async (employeeId:Number) => {
        await api.delete(`/employees/${employeeId}`);
    },
    updateEmployee: async (employeeId:Number, updatedEmployee:Employee) => {
        const response = await api.put(`/employees/${employeeId}`, updatedEmployee);
        return response.data;
    }
};
export default EmployeeService;