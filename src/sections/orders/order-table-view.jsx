/* eslint-disable no-shadow */
import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { TableRow, TableCell, CircularProgress } from '@mui/material';

import { fetchOrderDetailsByOrderId } from 'src/api/order-details';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from 'src/sections/user/table-no-data';
import TableEmptyRows from 'src/sections/user/table-empty-rows';

import OrderTableRow from './order-table-row';
import OrderTableHead from './order-table-head';
import OrderTableToolbar from './order-table-toolbar';
import { emptyRows, applyFilter, getComparator } from './utils';

export default function OrdersTableView({ orders }) {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('orderId');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        const value = event.target.value.toLowerCase();
        setPage(0);
        setFilterName(value);
    };

    const isSelected = (orderId) => selectedOrders.includes(orderId);

    const handleSelect = (orderId) => {
        const selectedIndex = selectedOrders.indexOf(orderId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedOrders, orderId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedOrders.slice(1));
        } else if (selectedIndex === selectedOrders.length - 1) {
            newSelected = newSelected.concat(selectedOrders.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedOrders.slice(0, selectedIndex),
                selectedOrders.slice(selectedIndex + 1)
            );
        }

        setSelectedOrders(newSelected);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = orders.map((order) => order.orderId);
            setSelectedOrders(newSelecteds);
            return;
        }
        setSelectedOrders([]);
    };

    const handleShowDetails = async (orderId) => {
        try {
            setLoading(true);
            const orderDetails = await fetchOrderDetailsByOrderId(orderId);
            setOrderDetails((prevDetails) => ({
                ...prevDetails,
                [orderId]: orderDetails,
            }));
        } catch (error) {
            console.error('Failed to fetch order details:', error);
        } finally {
            setLoading(false);
        }
    };

    const dataFiltered = applyFilter({
        inputData: orders,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Card>
            <OrderTableToolbar
                numSelected={selectedOrders.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
            />

            <Scrollbar>
                <TableContainer sx={{ overflow: 'unset' }}>
                    <Table sx={{ minWidth: 800 }}>
                        <OrderTableHead
                            order={order}
                            orderBy={orderBy}
                            rowCount={orders.length}
                            numSelected={selectedOrders.length}
                            onRequestSort={handleSort}
                            onSelectAllClick={handleSelectAllClick}
                            headLabel={[
                                { id: 'orderId', label: 'Order ID' },
                                { id: 'totalPrice', label: 'Total Price' },
                                { id: 'status', label: 'Status' },
                                { id: 'createdDate', label: 'Created At' },
                                { id: '', label: '' }
                            ]}
                        />
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((order) => (
                                        <OrderTableRow
                                            key={order.orderId}
                                            order={order}
                                            selected={isSelected(order.orderId)}
                                            handleClick={() => handleSelect(order.orderId)}
                                            handleShowDetails={handleShowDetails}
                                            orderDetails={orderDetails[order.orderId]}
                                        />
                                    ))
                            )}
                            <TableEmptyRows height={53} emptyRows={emptyRows(page, rowsPerPage, orders.length)} />
                            {notFound ? <TableNoData query={filterName} /> : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    );
}

OrdersTableView.propTypes = {
    orders: PropTypes.array.isRequired,
};
