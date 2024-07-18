import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';

import { createDishCategory, fetchDishCategories } from 'src/api/category';

import Iconify from 'src/components/iconify';

export default function DishDetail({ product, isUpdate, onUpdate, open, onClose }) {
    const [formData, setFormData] = useState({
        dishId: product.dishId,
        name: product.name,
        dishPrice: product.dishPrice,
        isAvailable: product.isAvailable,
        imageURL: product.imageURL,
        dishCategoryId: product.dishCategoryId,
        ingredients: product.ingredients
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [creatingNewCategory, setCreatingNewCategory] = useState(false);
    const [newCategoryFormData, setNewCategoryFormData] = useState({
        name: '',
        description: '',
    });

    useEffect(() => {
        fetchDishCategories().then(setCategories).catch(console.error);
    }, []);

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'isAvailable' ? checked : value,
        }));
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleCreateNewCategory = () => {
        setCreatingNewCategory(true);
    };

    const handleCloseCreateCategoryDialog = () => {
        setCreatingNewCategory(false);
        setNewCategoryFormData({
            name: '',
            description: '',
        });
    };

    const handleChangeNewCategory = (event) => {
        const { name, value } = event.target;
        setNewCategoryFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmitNewCategory = async () => {
        try {
            const newCategory = {
                name: newCategoryFormData.name,
                description: newCategoryFormData.description,
            };

            const createdCategory = await createDishCategory(newCategory);
            const { dishCategoryId } = createdCategory.content;

            fetchDishCategories()
                .then((categories1) => {
                    setCategories(categories1);
                    setFormData({
                        ...formData,
                        dishCategoryId,
                    });
                })
                .catch(console.error);

            setCreatingNewCategory(false);
            setNewCategoryFormData({
                name: '',
                description: '',
            });
        } catch (error) {
            console.error('Error creating new category:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataWithImage = new FormData();
        
        if (isUpdate) {
            formDataWithImage.append('dishId', formData.dishId);
        }

        Object.keys(formData).forEach((key) => {
            if (key !== 'imageURL' && key !== 'dishId') {
                formDataWithImage.append(key, formData[key]);
            }
        });

        if (selectedFile) {
            formDataWithImage.append('imageURL', selectedFile);
        }
        onUpdate(formDataWithImage);
    };


    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
                        <Typography variant="h4" gutterBottom>
                            Dish Details
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Box
                                    component="img"
                                    alt={formData.name}
                                    src={selectedFile ? URL.createObjectURL(selectedFile) : formData.imageURL}
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'cover',
                                        marginBottom: 2,
                                    }}
                                />
                                <label htmlFor="file-input">
                                    <input type="file" accept="image/*" onChange={handleFileChange} id="file-input" style={{ display: 'none' }} />
                                    <Button variant="outlined" component="span" fullWidth>
                                        Upload New Image
                                    </Button>
                                </label>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="name"
                                            label="Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="dishPrice"
                                            label="Price"
                                            value={formData.dishPrice}
                                            onChange={handleChange}
                                            type="number"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="ingredients"
                                            label="Ingredients"
                                            value={formData.ingredients}
                                            onChange={handleChange}
                                            fullWidth
                                            multiline
                                            rows={5}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="category-select-label">Category</InputLabel>
                                            <Select
                                                labelId="category-select-label"
                                                id="category-select"
                                                name="dishCategoryId"
                                                value={formData.dishCategoryId}
                                                onChange={handleChange}
                                                label="Category"
                                            >
                                                {categories.map((category) => (
                                                    <MenuItem key={category.dishCateGoryId} value={category.dishCateGoryId}>
                                                        {category.name}
                                                    </MenuItem>
                                                ))}
                                                <MenuItem
                                                    onClick={handleCreateNewCategory}
                                                    sx={{
                                                        color: 'text.secondary',
                                                    }}
                                                >
                                                    <Iconify icon="eva:plus-fill" /> Add New Category
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Switch checked={formData.isAvailable} onChange={handleChange} name="isAvailable" />}
                                            label="Available"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" fullWidth>
                                            {isUpdate ? 'Update Dish' : 'Create New Dish'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog open={creatingNewCategory} onClose={handleCloseCreateCategoryDialog} maxWidth="sm" fullWidth>
                <DialogContent>
                    <Box sx={{ padding: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Create New Category
                        </Typography>
                        <TextField
                            name="name"
                            label="Name"
                            value={newCategoryFormData.name}
                            onChange={handleChangeNewCategory}
                            fullWidth
                            required
                            autoFocus
                        />
                        <TextField
                            name="description"
                            label="Description"
                            value={newCategoryFormData.description}
                            onChange={handleChangeNewCategory}
                            fullWidth
                            multiline
                            rows={3}
                            sx={{ mt: 1 }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateCategoryDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmitNewCategory} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

DishDetail.propTypes = {
    product: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
