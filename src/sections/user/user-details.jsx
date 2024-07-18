import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    Dialog,
    Button,
    MenuItem,
    TextField,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

import { registerUser } from 'src/api/user';

export default function UserDetails({ open, onClose, onSave }) {
    const [form, setForm] = useState({
        displayName: '',
        email: '',
        password: '123', // Default password
        birthday: null,
        phoneNumber: '',
        address: '',
        role: 'STAFF',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setForm({
            ...form,
            birthday: date,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await registerUser(form);
            if (response.content?.responseMessage) {
                toast.info(response.content.responseMessage);
                onSave();
                onClose();
            } else {
                toast.error('Unexpected error occurred');
            }
        } catch (error) {
            console.error('Failed to create user:', error);
            toast.error('Failed to create user');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New User</DialogTitle>
            <DialogContent>
                <TextField
                    label="Display Name"
                    name="displayName"
                    value={form.displayName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <DatePicker
                    label="Birthday"
                    value={form.birthday}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    sx={{ width: '100%' }} // Make the DatePicker full width
                />
                <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Role"
                    name="role"
                    select
                    value={form.role}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="STAFF">Staff</MenuItem>
                    <MenuItem value="ADMIN">Admin</MenuItem>
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

UserDetails.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
};
