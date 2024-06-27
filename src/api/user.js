import axios from 'axios';

// Function to get the token
const getToken = () => localStorage.getItem('access_token');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/account',
  timeout: 1000,
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


export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get();
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};