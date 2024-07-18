import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { updateDishCategory, deleteDishCategory, createDishCategory, fetchDishCategories } from 'src/api/category';

import Iconify from 'src/components/iconify';

import CategoryTableView from '../category-table-view';
import CategoryDetailsDialog from '../category-details';

export default function CategoryView() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [submitButtonLabel, setSubmitButtonLabel] = useState('');
    const [currentCategory, setCurrentCategory] = useState({ name: '', description: '' });

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

    const handleDeleteCategory = async (categoryId) => {
        try {
            await deleteDishCategory(categoryId);
            fetchData();
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCurrentCategory({ ...currentCategory, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            if (dialogTitle === 'Create New Category') {
                await createDishCategory(currentCategory);
            } else {
                await updateDishCategory(currentCategory);
            }
            fetchData();
            handleCloseDialog();
        } catch (error) {
            console.error('Failed to submit category:', error);
        }
    };

    const handleOpenDialog = (category) => {
        if (category) {
            setCurrentCategory(category);
            setDialogTitle('Update Category');
            setSubmitButtonLabel('Update');
        } else {
            setCurrentCategory({ name: '', description: '' });
            setDialogTitle('Create New Category');
            setSubmitButtonLabel('Create');
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Categories</Typography>
                <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleOpenDialog(null)} >
                    New Category
                </Button>
            </Stack>
            <CategoryTableView
                categories={categories}
                onUpdateCategory={handleOpenDialog}
                onDeleteCategory={handleDeleteCategory}
            />
            <CategoryDetailsDialog
                open={openDialog}
                onClose={handleCloseDialog}
                formData={currentCategory}
                onChange={handleChange}
                onSubmit={handleSubmit}
                dialogTitle={dialogTitle}
                submitButtonLabel={submitButtonLabel}
            />
        </Container>
    );
}
