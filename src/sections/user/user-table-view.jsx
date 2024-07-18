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

import UserTableRow from './user-table-row';
import UserTableHead from './user-table-head';
import UserTableToolbar from './user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from './utils';

export default function UserTableView({ users, onUpdateUser, onDeleteUser }) {
    const [loading] = useState(false);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('email');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedUsers, setSelectedUsers] = useState([]);
    
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

    const isSelected = (userId) => selectedUsers.includes(userId);

    const handleSelect = (userId) => {
        const selectedIndex = selectedUsers.indexOf(userId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedUsers, userId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedUsers.slice(1));
        } else if (selectedIndex === selectedUsers.length - 1) {
            newSelected = newSelected.concat(selectedUsers.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedUsers.slice(0, selectedIndex),
                selectedUsers.slice(selectedIndex + 1)
            );
        }

        setSelectedUsers(newSelected);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = users.map((user) => user.id);
            setSelectedUsers(newSelecteds);
            return;
        }
        setSelectedUsers([]);
    };


    const dataFiltered = applyFilter({
        inputData: users,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Card>
            <UserTableToolbar
                numSelected={selectedUsers.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
            />

            <Scrollbar>
                <TableContainer sx={{ overflow: 'unset' }}>
                    <Table sx={{ minWidth: 800 }}>
                        <UserTableHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={[
                                { id: 'fullName', label: 'Name' },
                                { id: 'email', label: 'Email' },
                                { id: 'phoneNumber', label: 'Phone' },
                                { id: 'address', label: 'Address' },
                                { id: 'role', label: 'Role' },
                                { id: 'isEnable', label: 'Enabled'},
                                { id: 'isVerified', label: 'Verified' },
                                { id: '' },
                            ]}
                            rowCount={users.length}
                            numSelected={selectedUsers.length}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleSort}
                        />

                        <TableBody>
                            {loading && (
                                <TableRow>
                                    <TableCell align="center" colSpan={6}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            )}

                            {dataFiltered
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user) => (
                                    <UserTableRow
                                        key={user.id}
                                        user={user}
                                        selected={isSelected(user.id)}
                                        handleClick={() => handleSelect(user.id)}
                                        onUpdateUser={onUpdateUser}
                                        onDeleteUser={onDeleteUser}
                                    />
                                ))}

                            <TableEmptyRows height={72} emptyRows={emptyRows(page, rowsPerPage, users.length)} />
                            {notFound && <TableNoData query={filterName} />}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    );
}

UserTableView.propTypes = {
    users: PropTypes.array.isRequired,
    onUpdateUser: PropTypes.func.isRequired,
    onDeleteUser: PropTypes.func.isRequired,
};

