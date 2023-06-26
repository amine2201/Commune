
import axios from 'axios';
import { Citoyen } from '../../Types/types';

export const api = axios.create({baseURL: 'http://localhost:8080/api/v1'},);
api.defaults.headers.common["Content-Type"] = "application/json";
export const SignupCitoyen = async (citoyen : Citoyen) => {
    try {
        const {data} = await api.post('/register', citoyen);
        return data;
    }   catch (error) { console.dir("SIGN UP ERROR : ",error); }
}

export const LoginUser = async (email:string , password:string) => {
    try {
        const data = await api.post('/authenticate', {email , password});
        const {role,token} = data.data;
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('user', email);
        localStorage.setItem('role', role);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return data;
    }   catch (error) { console.dir("LOGIN ERROR : ",error);   }
}
export const LogoutUser = async () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    delete api.defaults.headers.common['Authorization'];
}