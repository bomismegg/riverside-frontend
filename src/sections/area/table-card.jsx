import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export default function TableCard({ tableName }) {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h6" textAlign="center">{tableName}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

TableCard.propTypes = {
    tableName: PropTypes.string.isRequired,
};

