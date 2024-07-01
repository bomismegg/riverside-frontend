import axios from 'axios';

const BASE_URL = 'http://localhost:8080';
const TIME_OUT = 1000

const getToken = () => localStorage.getItem('access_token');

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
