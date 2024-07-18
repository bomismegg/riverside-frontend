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

import CategoryTableRow from './category-table-row';
import CategoryTableHead from './category-table-head';
import CategoryTableToolbar from './category-table-toolbar';
import { emptyRows, applyFilter, getComparator } from './utils';

export default function CategoryTableView({ categories, onUpdateCategory, onDeleteCategory }) {
    const [loading] = useState(false);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('dishCateGoryId');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedCategories, setSelectedCategories] = useState([]);

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

    const isSelected = (dishCateGoryId) => selectedCategories.includes(dishCateGoryId);

    const handleSelect = (dishCateGoryId) => {
        const selectedIndex = selectedCategories.indexOf(dishCateGoryId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedCategories, dishCateGoryId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedCategories.slice(1));
        } else if (selectedIndex === selectedCategories.length - 1) {
            newSelected = newSelected.concat(selectedCategories.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedCategories.slice(0, selectedIndex),
                selectedCategories.slice(selectedIndex + 1)
            );
        }

        setSelectedCategories(newSelected);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = categories.map((category) => category.dishCateGoryId);
            setSelectedCategories(newSelecteds);
            return;
        }
        setSelectedCategories([]);
    };


    const dataFiltered = applyFilter({
        inputData: categories,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Card>
            <CategoryTableToolbar
                numSelected={selectedCategories.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
            />

            <Scrollbar>
                <TableContainer sx={{ overflow: 'unset' }}>
                    <Table sx={{ minWidth: 800 }}>
                        <CategoryTableHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={[
                                { id: 'dishCateGoryId', label: 'ID', alignRight: false },
                                { id: 'name', label: 'Name', alignRight: false },
                                { id: 'description', label: 'Description', alignRight: false },
                                { id: '' },
                            ]}
                            rowCount={categories.length}
                            numSelected={selectedCategories.length}
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
                                .map((category) => (
                                    <CategoryTableRow
                                        key={category.dishCateGoryId}
                                        category={category}
                                        selected={isSelected(category.dishCateGoryId)}
                                        handleClick={() => handleSelect(category.dishCateGoryId)}
                                        onUpdateCategory={onUpdateCategory}
                                        onDeleteCategory={onDeleteCategory}
                                    />
                                ))}

                            <TableEmptyRows height={72} emptyRows={emptyRows(page, rowsPerPage, categories.length)} />
                            {notFound && <TableNoData query={filterName} />}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={categories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    );
}

CategoryTableView.propTypes = {
    categories: PropTypes.array.isRequired,
    onUpdateCategory: PropTypes.func.isRequired,
    onDeleteCategory: PropTypes.func.isRequired,
};
