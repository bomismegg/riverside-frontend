import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

export default function UserTableRow({ user, selected, handleClick, onUpdateUser, onDeleteUser }) {
    const [open, setOpen] = useState(null);
    const { userId, fullName, email, phoneNumber, address, role, isEnable, isUnlocked } = user;
    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleDeleteUser = () => {
        onDeleteUser(userId);
        handleCloseMenu();
    };

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox
                        disableRipple
                        checked={selected}
                        onChange={handleClick}
                    />
                </TableCell>

                <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap>
                            {fullName}
                        </Typography>
                    </Stack>
                </TableCell>

                <TableCell>{email}</TableCell>

                <TableCell>{phoneNumber}</TableCell>

                <TableCell>{address}</TableCell>

                <TableCell>{role}</TableCell>

                <TableCell>
                    <Label color={isEnable ? 'success' : 'error'}>{isEnable ? 'Enabled' : 'Disabled'}</Label>
                </TableCell>

                <TableCell>
                    <Label color={isUnlocked ? 'success' : 'error'}>{isUnlocked ? 'Verified' : 'Unverified'}</Label>
                </TableCell>

                <TableCell align="right">
                    <IconButton onClick={handleOpenMenu}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: { width: 140 },
                }}
            >
                <MenuItem onClick={() => { handleCloseMenu(); onUpdateUser(user); }}>
                    <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem onClick={handleDeleteUser} sx={{ color: 'error.main' }}>
                    <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
}

UserTableRow.propTypes = {
    user: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
    onUpdateUser: PropTypes.func.isRequired,
    onDeleteUser: PropTypes.func.isRequired,
};

