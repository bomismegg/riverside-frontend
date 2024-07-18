import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Typography, ButtonGroup } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { fCurrency } from 'src/utils/format-number';

import { fetchDishes } from 'src/api/dishes';

import DishSelectionDialog from './dish-selection';

export default function OrderDetail({ order, onAddDish, onRemoveDish, onCompleteOrder, onCancelOrder, onClose, onSaveChanges }) {
    const [availableDishes, setAvailableDishes] = useState([]);
    const [isDishDialogOpen, setIsDishDialogOpen] = useState(false);
    const [localOrderDetails, setLocalOrderDetails] = useState(order.orderDetails);

    useEffect(() => {
        const getDishes = async () => {
            try {
                const dishes = await fetchDishes();
                order.orderDetails = order.orderDetails.map((orderDetail) => {
                    const dish = dishes.find((d) => d.dishId === orderDetail.dishId);
                    return dish ? { ...orderDetail, imageURL: dish.imageURL } : orderDetail;
                });
                setAvailableDishes(dishes);
            } catch (error) {
                console.error("Error fetching dishes:", error);
            }
        };

        getDishes();
    }, [order]);

    const handleAddDish = (dishId, quantity) => {
        if (dishId && quantity > 0) {
            const updatedOrderDetails = [...localOrderDetails];
            const existingDetail = updatedOrderDetails.find(detail => detail.dishId === dishId);
            if (existingDetail) {
                existingDetail.quantity += quantity;
            } else {
                const dish = availableDishes.find(d => d.dishId === dishId);
                updatedOrderDetails.push({ 
                    dishId, 
                    quantity, 
                    price: dish.dishPrice, 
                    description: dish.description || '', 
                    dishName: dish.name, 
                    imageURL: dish.imageURL 
                });
            }
            setLocalOrderDetails(updatedOrderDetails);
        }
    };

    const handleRemoveDish = (dishId) => {
        const updatedOrderDetails = localOrderDetails.filter(detail => detail.dishId !== dishId);
        setLocalOrderDetails(updatedOrderDetails);
    };

    const handleIncreaseQuantity = (orderDetailId) => {
        const updatedOrderDetails = localOrderDetails.map((detail) => {
            if (detail.orderDetailId === orderDetailId) {
                return { ...detail, quantity: detail.quantity + 1 };
            }
            return detail;
        });
        setLocalOrderDetails(updatedOrderDetails);
    };

    const handleDecreaseQuantity = (orderDetailId) => {
        const updatedOrderDetails = localOrderDetails.map((detail) => {
            if (detail.orderDetailId === orderDetailId && detail.quantity > 1) {
                return { ...detail, quantity: detail.quantity - 1 };
            }
            return detail;
        });
        setLocalOrderDetails(updatedOrderDetails);
    };

    const handleSaveChanges = () => {
        const updatedOrder = {
            ...order,
            orderDetails: localOrderDetails
        };

        onSaveChanges(updatedOrder);
    };

    const calculateTotalPrice = () => localOrderDetails.reduce((total, detail) => total + detail.price * detail.quantity, 0);

    const isCompleted = order.status === 'DONE';

    const getStatusButtonText = (status) => {
        switch (status) {
            case 'HAVE_NOT_STARTED':
                return 'Serve All Dishes';
            case 'IN_PROCESS':
                return 'Complete Order';
            case 'DONE':
                return 'Completed';
            case 'CANCELLED':
                return 'Cancelled';
            default:
                return '';
        }
    };

    const handleStatusChange = () => {
        if (order.status === 'HAVE_NOT_STARTED') {
            onCompleteOrder(order.orderId);
        } else if (order.status === 'IN_PROCESS') {
            onCompleteOrder(order.orderId);
        }
        onClose();
    };

    const handleCancelOrder = () => {
        onCancelOrder(order.orderId);
        onClose();
    };

    return (
        <>
            <DialogContent>
                <Typography variant="h6" gutterBottom>
                    Order Details for Table {order.tableName}
                </Typography>
                <List>
                    {localOrderDetails.map((detail) => (
                        <ListItem key={detail.orderDetailId} alignItems="flex-start" sx={{ mb: 2 }}>
                            <ListItemAvatar>
                                <Avatar
                                    variant="square"
                                    src={detail.imageURL}
                                    alt={detail.dishName}
                                    sx={{ width: 56, height: 56 }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={detail.dishName}
                                secondary={`Price: ${fCurrency(detail.price.toFixed(2))}`}
                                sx={{ ml: 2 }}
                            />
                            <ButtonGroup variant="" aria-label="outlined primary button group" sx={{ mx: 2 }}>
                                <Button onClick={() => handleDecreaseQuantity(detail.orderDetailId)} disabled={isCompleted}>-</Button>
                                <Button disabled>{detail.quantity}</Button>
                                <Button onClick={() => handleIncreaseQuantity(detail.orderDetailId)} disabled={isCompleted}>+</Button>
                            </ButtonGroup>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveDish(detail.dishId)} disabled={isCompleted}>
                                x
                            </IconButton>
                        </ListItem>
                    ))}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsDishDialogOpen(true)}
                        sx={{ mt: 3 }}
                        disabled={isCompleted}
                    >
                        Add Dish
                    </Button>
                </List>
                <Divider sx={{ my: 2 }} />
                <Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Total Price:</strong> {fCurrency(calculateTotalPrice().toFixed(2))}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Advance:</strong> {fCurrency(order.advance.toFixed(2))}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Remaining:</strong> {fCurrency(order.remaining.toFixed(2))}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleSaveChanges}
                    variant="contained"
                    color="primary"
                    disabled={isCompleted || order.status === 'CANCELLED'}
                >
                    Save
                </Button>
                <Button
                    onClick={handleStatusChange}
                    variant="contained"
                    color="primary"
                    disabled={isCompleted || order.status === 'CANCELLED'}
                >
                    {getStatusButtonText(order.status)}
                </Button>
                <Button
                    onClick={handleCancelOrder}
                    variant="contained"
                    color="error"
                    disabled={isCompleted || order.status === 'CANCELLED'}
                >
                    Cancel Order
                </Button>
                <Button onClick={onClose} variant="contained" color='primary'>
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
    onSaveChanges: PropTypes.func.isRequired, // Add this line
};
