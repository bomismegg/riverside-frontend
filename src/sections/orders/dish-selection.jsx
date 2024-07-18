import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import CardContent from '@mui/material/CardContent';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export default function DishSelectionDialog({ open, onClose, availableDishes, onAddDish }) {
    const [quantities, setQuantities] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDishes, setFilteredDishes] = useState(availableDishes);

    useEffect(() => {
        if (!open) {
            setQuantities({});
            setSearchQuery('');
            setFilteredDishes(availableDishes);
        }
    }, [open, availableDishes]);

    useEffect(() => {
        setFilteredDishes(
            availableDishes.filter((dish) =>
                dish.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, availableDishes]);

    const handleAddDish = () => {
        Object.keys(quantities).forEach((dishId) => {
            if (quantities[dishId] > 0) {
                onAddDish(dishId, quantities[dishId]);
            }
        });
        onClose();
    };

    const handleIncreaseQuantity = (dishId) => {
        setQuantities((prev) => ({
            ...prev,
            [dishId]: (prev[dishId] || 0) + 1
        }));
    };

    const handleDecreaseQuantity = (dishId) => {
        setQuantities((prev) => ({
            ...prev,
            [dishId]: Math.max(0, (prev[dishId] || 0) - 1)
        }));
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Select Dishes</DialogTitle>
            <DialogContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <InputBase
                        placeholder="Search dishes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ ml: 1, flex: 1 }}
                    />
                    <IconButton type="submit" sx={{ p: 1 }}>
                        <i className="ph-magnifying-glass" />
                    </IconButton>
                </Box>
                <Grid container spacing={2}>
                    {filteredDishes.map((dish) => (
                        <Grid item xs={12} sm={6} md={4} key={dish.dishId}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={dish.imageURL}
                                    alt={dish.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {dish.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ${dish.dishPrice.toFixed(2)}
                                    </Typography>
                                    <Box display="flex" alignItems="center" mt={1}>
                                        <IconButton onClick={() => handleDecreaseQuantity(dish.dishId)}>
                                            -
                                        </IconButton>
                                        <Typography variant="body2" sx={{ mx: 2 }}>
                                            {quantities[dish.dishId] || 0}
                                        </Typography>
                                        <IconButton onClick={() => handleIncreaseQuantity(dish.dishId)}>
                                            +
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleAddDish} color="primary" variant="contained">
                    Add Selected Dishes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

DishSelectionDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    availableDishes: PropTypes.array.isRequired,
    onAddDish: PropTypes.func.isRequired,
};