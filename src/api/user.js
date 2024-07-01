import axiosInstance from './base-api';

export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get('/account');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/account/login', { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};