import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fetchAreaById } from 'src/api/area';
import { fetchTableById } from 'src/api/table';
import { fetchOrders, updateOrder } from 'src/api/order';
import { createOrderDetail, deleteOrderDetail, fetchOrderDetailsByOrderId } from 'src/api/order-details';

import OrderCard from '../order-card';
import OrderDetail from '../order-detail';
import OrdersTableView from '../order-table-view';

export default function OrdersView() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [viewMode, setViewMode] = useState('card');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderData = await fetchOrders();
                const tableData = await Promise.all(orderData.map(async (order) => {
                    const table = await fetchTableById(order.tableId);
                    const area = await fetchAreaById(table.areaId);
                    const orderDetails = await fetchOrderDetailsByOrderId(order.orderId);
                    return { ...order, tableName: table.name, areaName: area.name, orderDetails };
                }));
                setOrders(tableData);
                setFilteredOrders(tableData);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleShowDetails = (orderId) => {
        const detailedOrder = orders.find(order => order.orderId === orderId);
        setSelectedOrder(detailedOrder);
        setOpenDialog(true);
    };

    const handleAddDish = async (orderId, dishId, quantity) => {
        try {
            const newOrderDetail = await createOrderDetail({
                orderId,
                dishId,
                quantity,
                price: 0, // Adjust this if you have the price data available
                description: '',
                status: 'HAVE_NOT_STARTED',
                personSaveId: localStorage.userId,
            });
            const updatedOrders = orders.map(order => {
                if (order.orderId === orderId) {
                    const existingDetail = order.orderDetails.find(detail => detail.dishId === dishId);
                    if (existingDetail) {
                        existingDetail.quantity += quantity;
                    } else {
                        order.orderDetails.push(newOrderDetail.content);
                    }
                    order.totalPrice += quantity * 0; // Adjust this if you have the price data available
                }
                return order;
            });
            setOrders(updatedOrders);
            toast.success('Dish added successfully!', {
                position: 'top-right',
            });
        } catch (error) {
            console.error('Failed to add dish:', error);
            toast.error('Failed to add dish.', {
                position: 'top-right',
            });
        }
    };

    const handleRemoveDish = async (orderId, dishId) => {
        try {
            await deleteOrderDetail(orderId, dishId);
            const updatedOrders = orders.map(order => {
                if (order.orderId === orderId) {
                    order.orderDetails = order.orderDetails.filter(detail => detail.dishId !== dishId);
                    order.totalPrice = order.orderDetails.reduce((total, detail) => total + detail.quantity * detail.price, 0);
                }
                return order;
            });
            setOrders(updatedOrders);
            toast.success('Dish removed successfully!', {
                position: 'top-right',
            });
        } catch (error) {
            console.error('Failed to remove dish:', error);
            toast.error('Failed to remove dish.', {
                position: 'top-right',
            });
        }
    };

    const handleCompleteOrder = async (orderId) => {
        const updatedOrders = orders.map(order => {
            if (order.orderId === orderId) {
                order.status = 'DONE';
            }
            return order;
        });
        setOrders(updatedOrders);
        await updateOrder({ orderId, status: 'DONE' });
    };

    const handleCancelOrder = async (orderId) => {
        const updatedOrders = orders.map(order => {
            if (order.orderId === orderId) {
                order.status = 'CANCELLED';
            }
            return order;
        });
        setOrders(updatedOrders);
        await updateOrder({ orderId, status: 'CANCELLED' });
    };

    const handleSaveChanges = async (updatedOrder) => {
        try {
            await updateOrder(updatedOrder);
            const updatedOrders = orders.map(order =>
                order.orderId === updatedOrder.orderId ? updatedOrder : order
            );
            setOrders(updatedOrders);
            setOpenDialog(false);
        } catch (error) {
            console.error('Failed to update order:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">
                    {viewMode === 'card' ? 'Active Orders' : 'Orders History'}
                </Typography>
                <Button variant="outlined" onClick={() => setViewMode(viewMode === 'card' ? 'table' : 'card')}>
                    {viewMode === 'card' ? 'History' : 'Active Orders'}
                </Button>
            </Stack>

            {viewMode === 'card' ? (
                <Grid container spacing={3}>
                    {filteredOrders
                        .filter((order) => order.status !== 'DONE')
                        .map((order) => (
                            <Grid key={order.orderId} xs={12} sm={6} md={3}>
                                <OrderCard
                                    order={order}
                                    onShowDetails={handleShowDetails}
                                />
                            </Grid>
                        ))}
                </Grid>
            ) : (
                <OrdersTableView
                    orders={orders.filter((order) => order.status === 'DONE')}
                    onShowDetails={handleShowDetails}
                />
            )}
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
                        onAddDish={handleAddDish}
                        onRemoveDish={handleRemoveDish}
                        onCompleteOrder={handleCompleteOrder}
                        onCancelOrder={handleCancelOrder}
                        onClose={() => setOpenDialog(false)}
                        onSaveChanges={handleSaveChanges}
                    />
                )}
            </Dialog>
            <ToastContainer />
        </Container>
    );
}
