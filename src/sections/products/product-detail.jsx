// ProductDetail.jsx
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const statuses = [
    { value: 'sale', label: 'Sale' },
    { value: 'new', label: 'New' },
    { value: 'out of stock', label: 'Out of Stock' },
];

export default function ProductDetail({ product, onUpdate }) {
    const [formData, setFormData] = useState({
        name: product.name,
        price: product.price,
        priceSale: product.priceSale,
        status: product.status,
        cover: product.cover,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdate(formData);
    };

    return (
        <Grid
            container
            spacing={2}
            component="form"
            onSubmit={handleSubmit}
            sx={{ padding: 2 }}
        >
            <Grid item xs={12} md={6}>
                <Box
                    component="img"
                    alt={formData.name}
                    src={formData.cover}
                    sx={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                    Update Product
                </Typography>
                <TextField
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="price"
                    label="Price"
                    value={formData.price}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="priceSale"
                    label="Sale Price"
                    value={formData.priceSale}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="status"
                    label="Status"
                    select
                    value={formData.status}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    {statuses.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    name="cover"
                    label="Cover Image URL"
                    value={formData.cover}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Box sx={{ mt: 2 }}>
                    <Button type="submit" variant="contained">
                        Update Product
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}

ProductDetail.propTypes = {
    product: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
};