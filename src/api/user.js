import axiosInstance from './base-api';

export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get('/account');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    const response = await axiosInstance.put('/account', userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/account', userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const searchUsers = async (searchCriteria) => {
  try {
    const response = await axiosInstance.post('/account/search', searchCriteria);
    return response.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

export const resendValidationEmail = async (email) => {
  try {
    const response = await axiosInstance.post('/account/resend-validation-email', { email });
    return response.data;
  } catch (error) {
    console.error("Error resending validation email:", error);
    throw error;
  }
};

export const registerUser = async (registrationData) => {
  try {
    const response = await axiosInstance.post('/account/register', registrationData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const refreshToken = async (token) => {
  try {
    const response = await axiosInstance.post('/account/refresh-token', { token });
    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
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

export const resetPassword = async (resetData) => {
  try {
    const response = await axiosInstance.patch('/account/reset-password', resetData);
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/account/${id}`);
    return response.data.content;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/account/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};

export const sendResetPasswordEmail = async (email) => {
  try {
    const response = await axiosInstance.get(`/account/send-reset-password-email?email=${email}`);
    return response.data;
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw error;
  }
};

export const activateAccount = async (activationData) => {
  try {
    const response = await axiosInstance.get(`/account/activate-account?confirmToken=${activationData}`)
    return response.data;
  } catch (error) {
    console.error("Error activating account:", error);
    throw error;
  }
};
