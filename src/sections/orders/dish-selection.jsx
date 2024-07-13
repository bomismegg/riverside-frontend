import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function DishSelectionDialog({ open, onClose, availableDishes, onAddDish }) {
    const [selectedDish, setSelectedDish] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleAddDish = () => {
        if (selectedDish) {
            onAddDish(selectedDish.dishId, quantity);
            setSelectedDish(null);
            setQuantity(1);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Select Dish</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {availableDishes.map((dish) => (
                        <Grid item xs={12} sm={6} md={4} key={dish.dishId}>
                            <Card
                                onClick={() => setSelectedDish(dish)}
                                sx={{
                                    cursor: 'pointer',
                                    border: selectedDish?.dishId === dish.dishId ? '2px solid #3f51b5' : 'none'
                                }}
                            >
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
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {selectedDish && (
                    <Box mt={2}>
                        <Typography variant="h6">Selected Dish: {selectedDish.name}</Typography>
                        <TextField
                            fullWidth
                            label="Quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            inputProps={{ min: 1 }}
                            sx={{ mt: 2 }}
                        />
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleAddDish} color="primary" variant="contained" disabled={!selectedDish}>
                    Add
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
