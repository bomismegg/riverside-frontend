import axiosInstance from './base-api';

export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get('/dish');
    console.log(response.data.content);
    return response.data.content;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get('/dishCategory');
    console.log(response.data.content);
    return response.data.content;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

export const updateProductAvailability = async ( isAvailable) => {
  try {
    const response = await axiosInstance.put(`/dish/`, { isAvailable });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating product availability:", error);
    throw error;
  }
};
