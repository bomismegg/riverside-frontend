import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function AreaFilters({
    openFilter,
    onOpenFilter,
    onCloseFilter,
    isAvailableOnly,
    onToggleAvailable,
}) {
    return (
        <>
            <Button variant="contained" onClick={onOpenFilter}>
                Filters
            </Button>
            <Drawer anchor="right" open={openFilter} onClose={onCloseFilter}>
                <div style={{ width: 250, padding: 20 }}>
                    <Typography variant="h6" gutterBottom>
                        Filters
                    </Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isAvailableOnly}
                                onChange={onToggleAvailable}
                            />
                        }
                        label="Available Only"
                    />
                    <Button variant="contained" onClick={onCloseFilter} sx={{ mt: 2 }}>
                        Apply
                    </Button>
                </div>
            </Drawer>
        </>
    );
}

AreaFilters.propTypes = {
    openFilter: PropTypes.bool,
    onOpenFilter: PropTypes.func,
    onCloseFilter: PropTypes.func,
    isAvailableOnly: PropTypes.bool,
    onToggleAvailable: PropTypes.func,
};