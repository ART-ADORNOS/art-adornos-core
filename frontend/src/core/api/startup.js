import axios from 'axios';

const apiStartups  = axios.create({
    baseURL: 'http://127.0.0.1:8000/store',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiStartups.interceptors.request.use(
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
export default apiStartups ;