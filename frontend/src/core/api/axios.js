import axios from 'axios';
import {BASE_URL_ACCOUNTS} from "../constants/urls";

const api = axios.create({
    baseURL: BASE_URL_ACCOUNTS,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)
export default api;