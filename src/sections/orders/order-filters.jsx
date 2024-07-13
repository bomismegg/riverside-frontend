import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

export default function OrderFilters({
    openFilter,
    onOpenFilter,
    onCloseFilter,
    users,
    selectedUsers,
    onSelectUser,
    selectedStatus,
    onSelectStatus,
}) {
    const renderUser = (
        <Stack spacing={1}>
            <Typography variant="subtitle2">User</Typography>
            <FormGroup>
                {users.map((user) => (
                    <FormControlLabel
                        key={user.userId}
                        control={
                            <Checkbox
                                checked={selectedUsers.includes(user.userId)}
                                onChange={() => onSelectUser(user.userId)}
                            />
                        }
                        label={user.name}
                    />
                ))}
            </FormGroup>
        </Stack>
    );

    const renderStatus = (
        <Stack>
            <Typography variant="subtitle2">Status</Typography>
            <TextField
                select
                fullWidth
                label="Status"
                value={selectedStatus}
                onChange={(e) => onSelectStatus(e.target.value)}
                sx={{ mb: 2 }}
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="HAVE_NOT_STARTED">Have Not Started</MenuItem>
                <MenuItem value="IN_PROCESS">In Process</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
            </TextField>
        </Stack>
    );

    return (
        <>
            <Button
                disableRipple
                color="inherit"
                endIcon={<Iconify icon="ic:round-filter-list" />}
                onClick={onOpenFilter}
            >
                Filters&nbsp;
            </Button>

            <Drawer
                anchor="right"
                open={openFilter}
                onClose={onCloseFilter}
                PaperProps={{
                    sx: { width: 280, border: 'none', overflow: 'hidden' },
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 1, py: 2 }}
                >
                    <Typography variant="h6" sx={{ ml: 1 }}>
                        Filters
                    </Typography>
                    <IconButton onClick={onCloseFilter}>
                        <Iconify icon="eva:close-fill" />
                    </IconButton>
                </Stack>

                <Divider />

                <Scrollbar>
                    <Stack spacing={3} sx={{ p: 3 }}>
                        {renderUser}
                        {renderStatus}
                    </Stack>
                </Scrollbar>

                <Box sx={{ p: 3 }}>
                    <Button
                        fullWidth
                        size="large"
                        type="button"
                        color="inherit"
                        variant="outlined"
                        startIcon={<Iconify icon="ic:round-clear-all" />}
                        onClick={() => {
                            onSelectUser([]);
                            onSelectStatus("");
                        }}
                    >
                        Clear All
                    </Button>
                </Box>
            </Drawer>
        </>
    );
}

OrderFilters.propTypes = {
    openFilter: PropTypes.bool,
    onOpenFilter: PropTypes.func,
    onCloseFilter: PropTypes.func,
    users: PropTypes.array,
    selectedUsers: PropTypes.array,
    onSelectUser: PropTypes.func,
    selectedStatus: PropTypes.string,
    onSelectStatus: PropTypes.func,
};
