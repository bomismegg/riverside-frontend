import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export default function CategoryDetailsDialog({
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
                        name="name"
                        label="Name"
                        value={formData.name}
                        onChange={onChange}
                        fullWidth
                        required
                        autoFocus
                    />
                    <TextField
                        name="description"
                        label="Description"
                        value={formData.description}
                        onChange={onChange}
                        fullWidth
                        multiline
                        rows={3}
                        sx={{ mt: 1 }}
                    />
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

CategoryDetailsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    dialogTitle: PropTypes.string.isRequired,
    submitButtonLabel: PropTypes.string.isRequired,
};
