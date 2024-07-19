import React from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { fCurrency } from 'src/utils/format-number';

export default function OrderCard({ order, onShowDetails }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'HAVE_NOT_STARTED':
                return 'default';
            case 'IN_PROCESS':
                return 'primary';
            case 'DONE':
                return 'success';
            case 'CANCELLED':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusName = (status) => {
        switch (status) {
            case 'HAVE_NOT_STARTED':
                return 'Preparing';
            case 'IN_PROCESS':
                return 'In Process';
            case 'DONE':
                return 'Completed';
            case 'CANCELLED':
                return 'Cancelled';
            default:
                return 'default';
        }
    };

    const dishCount = order.orderDetails.reduce((acc, detail) => acc + detail.quantity, 0);

    return (
        <Card sx={{ boxShadow: 3 }}>
            <CardContent>
                <Stack spacing={1}>
                    <Typography variant="h6">
                        {order.areaName} - {order.tableName}
                    </Typography>
                    <Divider />
                    <Typography>
                        Customer: {order.orderName}
                    </Typography>
                    Dishes Count: {dishCount}
                    <Typography variant="body2" color="text.secondary">
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                            Total Price: {fCurrency(order.totalPrice.toFixed(2))}
                        </Typography>
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                            Status:
                        </Typography>
                        <Chip label={getStatusName(order.status)} color={getStatusColor(order.status)} />
                    </Stack>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onShowDetails(order.orderId)}
                        sx={{ mt: 2 }}
                        fullWidth
                    >
                        View Details
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}

OrderCard.propTypes = {
    order: PropTypes.object.isRequired,
    onShowDetails: PropTypes.func.isRequired,
};
