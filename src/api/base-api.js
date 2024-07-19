import axios from 'axios';

const BASE_URL = 'https://sharemebackend.online';
const TIME_OUT = 10000

const getToken = () => localStorage.getItem('access_token');

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    headers: {
        'Content-Type': 'application/json'
    }
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