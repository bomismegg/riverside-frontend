import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export default function OrderCard({ order, onShowDetails }) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Table ID: {order.tableId}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Order ID: #{order.orderId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    User ID: {order.userId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Total Price: ${order.totalPrice.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Status: {order.status}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onShowDetails(order.orderId)}
                    sx={{ mt: 1 }}
                >
                    Description
                </Button>
            </CardContent>
        </Card>
    );
}

OrderCard.propTypes = {
    order: PropTypes.shape({
        orderId: PropTypes.string.isRequired,
        tableId: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        totalPrice: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
    onShowDetails: PropTypes.func.isRequired,
};
