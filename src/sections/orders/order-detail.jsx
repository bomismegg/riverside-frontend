import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Grid, Typography, ButtonGroup } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { fetchDishes } from 'src/api/dishes';

import DishSelectionDialog from './dish-selection';

export default function OrderDetail({ order, onAddDish, onRemoveDish, onCompleteOrder, onCancelOrder, onClose }) {
    const [selectedDish, setSelectedDish] = useState('');
    const [availableDishes, setAvailableDishes] = useState([]);
    const [isDishDialogOpen, setIsDishDialogOpen] = useState(false);
    const [orderState, setOrderState] = useState(order);

    useEffect(() => {
        const getDishes = async () => {
            try {
                const dishes = await fetchDishes();
                setAvailableDishes(dishes);
            } catch (error) {
                console.error("Error fetching dishes:", error);
            }
        };

        getDishes();
    }, []);

    const handleAddDish = (dishId, quantity) => {
        if (dishId && quantity > 0) {
            onAddDish(orderState.orderId, dishId, quantity);
            setSelectedDish('');
        }
    };

    const handleIncreaseQuantity = (dishId) => {
        const updatedDishes = orderState.dishes.map((dish) => {
            if (dish.dishId === dishId) {
                return { ...dish, quantity: dish.quantity + 1 };
            }
            return dish;
        });
        setOrderState({ ...orderState, dishes: updatedDishes });
    };

    const handleDecreaseQuantity = (dishId) => {
        const updatedDishes = orderState.dishes.map((dish) => {
            if (dish.dishId === dishId && dish.quantity > 1) {
                return { ...dish, quantity: dish.quantity - 1 };
            }
            return dish;
        });
        setOrderState({ ...orderState, dishes: updatedDishes });
    };

    return (
        <>
            <DialogContent>
                <Typography variant="h6" gutterBottom>
                    Order Details for Table {orderState.tableId}
                </Typography>
                <List>
                    {orderState.dishes.map((dish) => (
                        <ListItem key={dish.dishId} alignItems="flex-start" sx={{ mb: 2 }}>
                            <ListItemAvatar>
                                <Avatar
                                    variant="square"
                                    src={dish.imageURL}
                                    alt={dish.name}
                                    sx={{ width: 56, height: 56 }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={dish.name}
                                secondary={`Price: $${dish.dishPrice.toFixed(2)}`}
                                sx={{ ml: 2 }}
                            />
                            <ButtonGroup variant="" aria-label="outlined primary button group" sx={{ mx: 2 }}>
                                <Button onClick={() => handleDecreaseQuantity(dish.dishId)}>-</Button>
                                <Button disabled>{dish.quantity}</Button>
                                <Button onClick={() => handleIncreaseQuantity(dish.dishId)}>+</Button>
                            </ButtonGroup>
                            <IconButton edge="end" aria-label="delete" onClick={() => onRemoveDish(orderState.orderId, dish.dishId)}>
                                x
                            </IconButton>
                        </ListItem>
                    ))}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsDishDialogOpen(true)}
                        sx={{ mt: 3 }}
                    >
                        Add Dish
                    </Button>
                </List>
                <Divider sx={{ my: 2 }} />
                <Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Total Price:</strong> ${orderState.totalPrice.toFixed(2)}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Advance:</strong> ${orderState.advance.toFixed(2)}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Remaining:</strong> ${orderState.remaining.toFixed(2)}
                    </Typography>
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => onCompleteOrder(orderState.orderId)} variant="contained" color="primary">
                    Mark as Complete
                </Button>
                <Button onClick={() => onCancelOrder(orderState.orderId)} variant="contained" color="secondary">
                    Cancel Order
                </Button>
                <Button onClick={onClose} variant="contained">
                    Close
                </Button>
            </DialogActions>
            <DishSelectionDialog
                open={isDishDialogOpen}
                onClose={() => setIsDishDialogOpen(false)}
                availableDishes={availableDishes}
                onAddDish={handleAddDish}
            />
        </>
    );
}

OrderDetail.propTypes = {
    order: PropTypes.object.isRequired,
    onAddDish: PropTypes.func.isRequired,
    onRemoveDish: PropTypes.func.isRequired,
    onCompleteOrder: PropTypes.func.isRequired,
    onCancelOrder: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};