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

const documentService = {
    getDocuments: async () => {
        const response = await api.get(`/documents`);
        return response.data;

    },
    getDocument: async (documentId:Number) => {
        const response = await api.get(`/documents/${documentId}`);
        return response.data;
    },
    createDocument: async (document:Citoyen) => {
        const response = await api.post(`/documents`, document);
        return response.data;
    },
    fetchDocument: async (documentId:Number) => {
        const response = await api.get(`/download/${documentId}`);
        return response.data;
    },
    signDocument: async (documentId:Number,file:File) => {
        const formData = new FormData();
        formData.append("file", file);
        const response= await api.post(`/documents/signer/${documentId}`, formData);
        return response.data;
    }
};
export default documentService;