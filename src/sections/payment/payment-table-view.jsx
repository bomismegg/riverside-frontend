/* eslint-disable no-shadow */
import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { TableRow, TableCell, CircularProgress } from '@mui/material';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from 'src/sections/user/table-no-data';
import TableEmptyRows from 'src/sections/user/table-empty-rows';

import PaymentTableRow from './payment-table-row';
import PaymentTableHead from './payment-table-head';
import PaymentTableToolbar from './payment-table-toolbar';
import { emptyRows, applyFilter, getComparator } from './utils';

export default function PaymentTableView({ payments }) {
    const [loading] = useState(false);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('paymentId');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedPayments, setSelectedPayments] = useState([]);

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

    const isSelected = (paymentId) => selectedPayments.includes(paymentId);

    const handleSelect = (paymentId) => {
        const selectedIndex = selectedPayments.indexOf(paymentId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedPayments, paymentId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedPayments.slice(1));
        } else if (selectedIndex === selectedPayments.length - 1) {
            newSelected = newSelected.concat(selectedPayments.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedPayments.slice(0, selectedIndex),
                selectedPayments.slice(selectedIndex + 1)
            );
        }

        setSelectedPayments(newSelected);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = payments.map((payment) => payment.paymentId);
            setSelectedPayments(newSelecteds);
            return;
        }
        setSelectedPayments([]);
    };


    const dataFiltered = applyFilter({
        inputData: payments,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Card>
            <PaymentTableToolbar
                numSelected={selectedPayments.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
            />

            <Scrollbar>
                <TableContainer sx={{ overflow: 'unset' }}>
                    <Table sx={{ minWidth: 800 }}>
                        <PaymentTableHead
                            order={order}
                            orderBy={orderBy}
                            rowCount={payments.length}
                            numSelected={selectedPayments.length}
                            onRequestSort={handleSort}
                            onSelectAllClick={handleSelectAllClick}
                            headLabel={[
                                { id: 'paymentId', label: 'Payment ID' },
                                { id: 'price', label: 'Price' },
                                { id: 'paymentTime', label: 'Payment Time' },
                                { id: 'isAvailable', label: 'Is Available' },
                                { id: 'createdDate', label: 'Created At' },
                                { id: 'modifiedBy', label: 'Modified By' },
                                { id: 'orderId', label: 'Order ID' }
                            ]}
                        />
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((payment) => (
                                        <PaymentTableRow
                                            key={payment.paymentId}
                                            payment={payment}
                                            selected={isSelected(payment.paymentId)}
                                            handleClick={() => handleSelect(payment.paymentId)}
                                        />
                                    ))
                            )}
                            <TableEmptyRows height={53} emptyRows={emptyRows(page, rowsPerPage, payments.length)} />
                            {notFound ? <TableNoData query={filterName} /> : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={payments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    );
}

PaymentTableView.propTypes = {
    payments: PropTypes.array.isRequired,
};

