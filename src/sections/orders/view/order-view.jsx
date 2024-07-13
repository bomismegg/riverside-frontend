import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fetchOrders } from 'src/api/order';
import { fetchDishById } from 'src/api/dishes';
import { fetchOrderDetailsByOrderId } from 'src/api/order-details';

import OrderCard from '../order-card';
import OrderDetail from '../order-detail';
import OrdersTableView from '../order-table-view';

export default function OrdersView() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAvailableOnly, setIsAvailableOnly] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [viewMode, setViewMode] = useState('card');

    useEffect(() => {
        const getOrders = async () => {
            try {
                const orderData = await fetchOrders();
                setOrders(orderData);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };

        getOrders();
    }, []);

    useEffect(() => {
        let filtered = orders;

        if (isAvailableOnly) {
            filtered = filtered.filter((order) => order.status === 'IN_PROCESS');
        }

        setFilteredOrders(filtered);
    }, [isAvailableOnly, orders]);

    const handleShowDetails = async (orderId) => {
        try {
            setLoading(true);
            const orderDetails = await fetchOrderDetailsByOrderId(orderId);

            const detailedDishes = await Promise.all(orderDetails.map(async (detail) => {
                const dish = await fetchDishById(detail.dishId);
                return { ...detail, ...dish };
            }));

            const detailedOrder = {
                ...orders.find(order => order.orderId === orderId),
                dishes: detailedDishes
            };

            setSelectedOrder(detailedOrder);
            setOpenDialog(true);
        } catch (error) {
            console.error('Failed to fetch order details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">
                    {viewMode === 'card' ? 'Active Orders' : 'All Orders'}
                </Typography>
                <Button variant="outlined" onClick={() => setViewMode(viewMode === 'card' ? 'table' : 'card')}>
                    {viewMode === 'card' ? 'Switch to Table View' : 'Switch to Card View'}
                </Button>
            </Stack>

            {viewMode === 'card' ? (
                <>
                    <Stack
                        direction="row"
                        alignItems="center"
                        flexWrap="wrap-reverse"
                        justifyContent="flex-end"
                        sx={{ mb: 5 }}
                    >
                        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                            {/* Additional Filters or Controls */}
                        </Stack>
                    </Stack>

                    <Grid container spacing={3}>
                        {filteredOrders.map((order) => (
                            <Grid key={order.orderId} xs={12} sm={6} md={3}>
                                <OrderCard
                                    order={order}
                                    onShowDetails={handleShowDetails}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Dialog
                        open={openDialog}
                        onClose={() => setOpenDialog(false)}
                        aria-labelledby="order-detail-dialog"
                        maxWidth="lg"
                        fullWidth
                    >
                        {selectedOrder && (
                            <OrderDetail
                                order={selectedOrder}
                                onClose={() => setOpenDialog(false)}
                            />
                        )}
                    </Dialog>
                </>
            ) : (
                <OrdersTableView orders={orders} />
            )}
        </Container>
    );
}
