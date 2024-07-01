import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ProductDetail({ product, onUpdate }) {
    const [formData, setFormData] = useState({
        dishId: product.dishId,
        name: product.name,
        dishPrice: product.dishPrice,
        isAvailable: product.isAvailable,
        imageURL: product.imageURL,
        dishCategoryId: product.dishCategoryId,
    });

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        setFormData({ 
            ...formData, 
            [name]: name === 'isAvailable' ? checked : value 
        });
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
                    src={formData.imageURL}
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
                    name="dishPrice"
                    label="Price"
                    value={formData.dishPrice}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="imageURL"
                    label="Image URL"
                    value={formData.imageURL}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="dishCategoryId"
                    label="Category ID"
                    value={formData.dishCategoryId}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={formData.isAvailable}
                            onChange={handleChange}
                            name="isAvailable"
                        />
                    }
                    label="Available"
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