import axios from 'axios';
import { userType } from '../../Types/types';

export const api = axios.create({baseURL: 'http://localhost:8080/api/v1'},);

export const SignupUser = async (userData : userType) => {
    try {
        const {data} = await api.post('/register', userData);
        return data;
    }   catch (error) { console.dir("SIGN UP ERROR : ",error); }
}

export const LoginUser = async ({email , password} : userType) => {
    try {
        const {data} = await api.post('/authenticate', {email , password});
        const {token} = data;
        data.user = {email};
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('user', JSON.stringify(data.user));
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return data;
    }   catch (error) { console.dir("LOGIN ERROR : ",error); }
}

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('jwtToken');
    // Set the access token in the request headers
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Make a request to the refresh token endpoint to get a new access token
        const { data } = await api.post('/refresh-token');
        const newAccessToken = data.accessToken;

        // Update the access token in local storage
        localStorage.setItem('jwtToken', newAccessToken);

        // Set the new access token in the request headers
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request with the new access token
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token request error, e.g., logout the user
        console.error('Failed to refresh access token:', refreshError);
        // Logout the user or perform any other necessary actions
        // ...
      }
    }

    // Return any other error
    return Promise.reject(error);
  }
);

