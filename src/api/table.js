import axiosInstance from './base-api';

export const fetchTables = async () => {
    try {
        const response = await axiosInstance.get('/table');
        return response.data.content;
    } catch (error) {
        console.error("Error fetching tables:", error);
        throw error;
    }
};

export const updateTable = async (tableId, tableData) => {
    try {
        const response = await axiosInstance.put(`/table/${tableId}`, tableData);
        return response.data;
    } catch (error) {
        console.error("Error updating table:", error);
        throw error;
    }
};

export const createTable = async (tableData) => {
    try {
        const response = await axiosInstance.post('/table', tableData);
        return response.data;
    } catch (error) {
        console.error("Error creating table:", error);
        throw error;
    }
};

export const fetchTableById = async (tableId) => {
    try {
        const response = await axiosInstance.get(`/table/${tableId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching table by ID:", error);
        throw error;
    }
};

export const deleteTable = async (tableId) => {
    try {
        const response = await axiosInstance.delete(`/table/${tableId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting table:", error);
        throw error;
    }
};
