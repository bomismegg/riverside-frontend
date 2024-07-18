import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { MenuItem } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function UserDetailsDialog({
    open,
    onClose,
    formData,
    onChange,
    onSubmit,
    dialogTitle,
    submitButtonLabel
}) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogContent>
                <Box sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        {dialogTitle}
                    </Typography>
                    <TextField
                        name="displayName"
                        label="Display Name"
                        value={formData.fullName}
                        onChange={onChange}
                        fullWidth
                        required
                        autoFocus
                    />
                    <TextField
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={onChange}
                        fullWidth
                        required
                        sx={{ mt: 1 }}
                    />
                    <DatePicker
                        label="Birthday"
                        value={formData.birthday ? new Date(formData.birthday) : null}
                        onChange={(date) => onChange({ target: { name: 'birthday', value: date } })}
                        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                        sx={{ mt: 1, width: '100%' }}
                    />
                    <TextField
                        name="phoneNumber"
                        label="Phone Number"
                        value={formData.phoneNumber}
                        onChange={onChange}
                        fullWidth
                        sx={{ mt: 1 }}
                    />
                    <TextField
                        name="address"
                        label="Address"
                        value={formData.address}
                        onChange={onChange}
                        fullWidth
                        sx={{ mt: 1 }}
                    />
                    <TextField
                        name="role"
                        label="Role"
                        value={formData.role}
                        onChange={onChange}
                        select
                        fullWidth
                        sx={{ mt: 1 }}
                    >
                        <MenuItem value="STAFF">Staff</MenuItem>
                        <MenuItem value="MANAGER">Manager</MenuItem>
                    </TextField>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={onSubmit} color="primary">
                    {submitButtonLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

UserDetailsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    dialogTitle: PropTypes.string.isRequired,
    submitButtonLabel: PropTypes.string.isRequired,
};

