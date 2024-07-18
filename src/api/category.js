import axiosInstance from "./base-api";

export const fetchDishCategories = async () => {
    try {
        const response = await axiosInstance.get('/dishCategory');
        return response.data.content;
    } catch (error) {
        console.error("Error fetching dish categories:", error);
        throw error;
    }
};

export const updateDishCategory = async (categoryData) => {
    try {
        const response = await axiosInstance.put(`/dishCategory`, categoryData);
        return response.data;
    } catch (error) {
        console.error("Error updating dish category:", error);
        throw error;
    }
};

export const createDishCategory = async (categoryData) => {
    try {
        const response = await axiosInstance.post('/dishCategory', categoryData);
        return response.data;
    } catch (error) {
        console.error("Error creating dish category:", error);
        throw error;
    }
};

export const fetchDishCategoryById = async (categoryId) => {
    try {
        const response = await axiosInstance.get(`/dishCategory/${categoryId}`);
        return response.data.content;
    } catch (error) {
        console.error("Error fetching dish category by ID:", error);
        throw error;
    }
};

export const deleteDishCategory = async (categoryId) => {
    try {
        const response = await axiosInstance.delete(`/dishCategory/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting dish category:", error);
        throw error;
    }
};