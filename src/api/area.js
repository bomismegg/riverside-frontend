import axiosInstance from './base-api';

export const fetchAreas = async () => {
    try {
        const response = await axiosInstance.get('/area');
        return response.data.content;
    } catch (error) {
        console.error("Error fetching areas:", error);
        throw error;
    }
};

export const updateArea = async (areaId, areaData) => {
    try {
        const response = await axiosInstance.put(`/area/${areaId}`, areaData);
        return response.data;
    } catch (error) {
        console.error("Error updating area:", error);
        throw error;
    }
};

export const createArea = async (areaData) => {
    try {
        const response = await axiosInstance.post('/area', areaData);
        return response.data;
    } catch (error) {
        console.error("Error creating area:", error);
        throw error;
    }
};

export const fetchAreaById = async (areaId) => {
    try {
        const response = await axiosInstance.get(`/area/${areaId}`);
        return response.data.content;
    } catch (error) {
        console.error("Error fetching area by ID:", error);
        throw error;
    }
};

export const deleteArea = async (areaId) => {
    try {
        const response = await axiosInstance.delete(`/area/${areaId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting area:", error);
        throw error;
    }
};