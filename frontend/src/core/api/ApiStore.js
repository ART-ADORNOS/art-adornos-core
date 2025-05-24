import axios from 'axios';
import {BASE_URL_STORE} from "../constants/urls";

const apiStore = axios.create({
    baseURL: BASE_URL_STORE,

});

apiStore.interceptors.request.use(
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
export default apiStore;