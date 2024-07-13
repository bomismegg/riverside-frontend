import axiosInstance from './base-api';

export const fetchOrders = async () => {
    try {
        const response = await axiosInstance.get('/order');
        return response.data.content;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

export const updateOrder = async (orderId, orderData) => {
    try {
        const response = await axiosInstance.put(`/order/${orderId}`, orderData);
        return response.data;
    } catch (error) {
        console.error("Error updating order:", error);
        throw error;
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await axiosInstance.post('/order', orderData);
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};

export const fetchOrderById = async (orderId) => {
    try {
        const response = await axiosInstance.get(`/order/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        throw error;
    }
};

export const deleteOrder = async (orderId) => {
    try {
        const response = await axiosInstance.delete(`/order/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting order:", error);
        throw error;
    }
};

export const fetchOrdersByUser = async (userId) => {
    try {
        const response = await axiosInstance.get(`/order/byUser/${userId}`);
        return response.data.content;
    } catch (error) {
        console.error("Error fetching orders by user ID:", error);
        throw error;
    }
};