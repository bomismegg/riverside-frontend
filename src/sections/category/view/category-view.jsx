import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { fetchDishCategories, updateDishCategory, deleteDishCategory } from 'src/api/category';

import CategoryTableView from '../category-table-view';

export default function CategoryView() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const categoryData = await fetchDishCategories();
            setCategories(categoryData);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateCategory = async (categoryData) => {
        try {
            await updateDishCategory(categoryData);
            fetchData();
        } catch (error) {
            console.error('Failed to update category:', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await deleteDishCategory(categoryId);
            fetchData();
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Categories</Typography>
            </Stack>
            <CategoryTableView
                categories={categories}
                onUpdateCategory={handleUpdateCategory}
                onDeleteCategory={handleDeleteCategory}
            />
        </Container>
    );
}
