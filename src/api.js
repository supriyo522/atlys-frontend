import axios from 'axios';

const API_URL = 'https://atlys-backend.onrender.com/api';

export const register = (data) => axios.post(`${API_URL}/auth/register`, data);
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);
export const createPost = (data, token) => axios.post(`${API_URL}/posts`, data, {
    headers: { Authorization: token }
});
