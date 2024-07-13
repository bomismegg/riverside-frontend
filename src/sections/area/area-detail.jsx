import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export default function AreaDetail({ area, onUpdate }) {
    const [name, setName] = useState(area.name);
    const [isAvailable, setIsAvailable] = useState(area.isAvailable);

    const handleUpdate = () => {
        onUpdate({ ...area, name, isAvailable });
    };

    return (
        <>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Area Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Availability"
                    value={isAvailable ? 'Available' : 'Not Available'}
                    disabled
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpdate} variant="contained" color="primary">
                    Update
                </Button>
            </DialogActions>
        </>
    );
}

AreaDetail.propTypes = {
    area: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
};