import React from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export default function AreaCard({ area, onEdit, onToggleAvailability, onAddTable }) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{area.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {area.isAvailable ? 'Available' : 'Not Available'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Tables:
                </Typography>
                <Stack spacing={1}>
                    {area.tableIdList.map((tableId) => (
                        <Typography key={tableId} variant="body2" color="text.secondary">
                            {tableId}
                        </Typography>
                    ))}
                </Stack>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onEdit(area)}
                    sx={{ mt: 2 }}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onToggleAvailability(area.areaId, !area.isAvailable)}
                    sx={{ mt: 1 }}
                >
                    {area.isAvailable ? 'Mark as Unavailable' : 'Mark as Available'}
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => onAddTable(area.areaId)}
                    sx={{ mt: 1 }}
                >
                    Add Table
                </Button>
            </CardContent>
        </Card>
    );
}

AreaCard.propTypes = {
    area: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onToggleAvailability: PropTypes.func.isRequired,
    onAddTable: PropTypes.func.isRequired,
};
