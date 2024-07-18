import axiosInstance from "./base-api";

export const updateOrderDetailStatus = async (orderDetailId, status) => {
    try {
        const response = await axiosInstance.put(`/orderDetail/${orderDetailId}/${status}`);
        return response.data;
    } catch (error) {
        console.error("Error updating order detail status:", error);
        throw error;
    }
};

export const fetchOrderDetails = async () => {
    try {
        const response = await axiosInstance.get('/orderDetail');
        return response.data.content;
    } catch (error) {
        console.error("Error fetching order details:", error);
        throw error;
    }
};

export const createOrderDetail = async (orderDetailData) => {
    try {
        const response = await axiosInstance.post('/orderDetail', orderDetailData);
        return response.data;
    } catch (error) {
        console.error("Error creating order detail:", error);
        throw error;
    }
};

export const fetchOrderDetailById = async (orderDetailId) => {
    try {
        const response = await axiosInstance.get(`/orderDetail/${orderDetailId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order detail by ID:", error);
        throw error;
    }
};

export const deleteOrderDetail = async (orderDetailId) => {
    try {
        const response = await axiosInstance.delete(`/orderDetail/${orderDetailId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting order detail:", error);
        throw error;
    }
};

export const fetchOrderDetailsByOrderId = async (orderId) => {
    try {
        const response = await axiosInstance.get(`/orderDetail/order/${orderId}`);
        return response.data.content;
    } catch (error) {
        console.error("Error fetching order details by order ID:", error);
        throw error;
    }
};

export const fetchOrderDetailsByAccountId = async (accountId) => {
    try {
        const response = await axiosInstance.get(`/orderDetail/account/${accountId}`);
        return response.data.content;
    } catch (error) {
        console.error("Error fetching order details by account ID:", error);
        throw error;
    }
};