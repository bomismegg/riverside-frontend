import axiosInstance from "./base-api";

export const fetchDishes = async () => {
    try {
        const response = await axiosInstance.get('/dish');
        return response.data.content;
    } catch (error) {
        console.error("Error fetching dishes:", error);
        throw error;
    }
};

export const updateDish = async (dishData) => {
    try {
        const response = await axiosInstance.post(`/dish`, dishData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating dish:", error);
        throw error;
    }
};

export const createDish = async (request) => {
    try {
        const response = await axiosInstance.post(`/dish`, request,{
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating dish:", error);
        throw error;
    }
};

export const fetchDishById = async (dishId) => {
    try {
        const response = await axiosInstance.get(`/dish/${dishId}`);
        return response.data.content;
    } catch (error) {
        console.error("Error fetching dish by ID:", error);
        throw error;
    }
};

export const deleteDish = async (dishId) => {
    try {
        const response = await axiosInstance.delete(`/dish/${dishId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting dish:", error);
        throw error;
    }
};

export const fetchDishesByCategoryId = async (categoryId) => {
    try {
        const response = await axiosInstance.get(`/dish/category/${categoryId}`);
        return response.data.content;
    } catch (error) {
        console.error("Error fetching dishes by category ID:", error);
        throw error;
    }
};