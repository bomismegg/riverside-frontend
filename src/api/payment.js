import axiosInstance from './base-api';

export const fetchPayments = async () => {
    try {
        const response = await axiosInstance.get('/payment');
        return response.data.content;
    } catch (error) {
        console.error("Error fetching payments:", error);
        throw error;
    }
};

export const updatePayment = async (paymentId, paymentData) => {
    try {
        const response = await axiosInstance.put(`/payment/${paymentId}`, paymentData);
        return response.data;
    } catch (error) {
        console.error("Error updating payment:", error);
        throw error;
    }
};

export const createPayment = async (paymentData) => {
    try {
        const response = await axiosInstance.post('/payment', paymentData);
        return response.data;
    } catch (error) {
        console.error("Error creating payment:", error);
        throw error;
    }
};

export const fetchPaymentById = async (paymentId) => {
    try {
        const response = await axiosInstance.get(`/payment/${paymentId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching payment by ID:", error);
        throw error;
    }
};

export const deletePayment = async (paymentId) => {
    try {
        const response = await axiosInstance.delete(`/payment/${paymentId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting payment:", error);
        throw error;
    }
};
