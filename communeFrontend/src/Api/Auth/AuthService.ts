
import axios from 'axios';
import { Citoyen, User } from '../../Types/types';

export const api = axios.create({baseURL: 'http://localhost:8080/api/v1'},);
api.defaults.headers.common["Content-Type"] = "application/json";
export const SignupCitoyen = async (citoyen : Citoyen) => {
    try {
        const {data} = await api.post('/register', citoyen);
        return data;
    }   catch (error) { console.dir("SIGN UP ERROR : ",error); }
}

export const LoginUser = async ({email , password} : User) => {
    try {
        const {data} = await api.post('/authenticate', {email , password});
        const {token} = data;
        data.user = {email};
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('user', JSON.stringify(data.user));
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return data;
    }   catch (error) { console.dir("LOGIN ERROR : ",error);   }
}
export const LogoutUser = async () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
}