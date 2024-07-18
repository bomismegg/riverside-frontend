/* eslint-disable no-shadow */
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fetchAreas } from 'src/api/area';
import { fetchTables } from 'src/api/table';

import TableCard from '../table-card';
import AreaDetail from '../area-detail';
import AreaFilters from '../area-filters';

export default function AreasView() {
    const [areas, setAreas] = useState([]);
    const [isAvailableOnly, setIsAvailableOnly] = useState(false);
    const [filteredAreas, setFilteredAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openFilter, setOpenFilter] = useState(false);
    const [selectedArea, setSelectedArea] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const getAreas = async () => {
            try {
                const areaData = await fetchAreas();
                const tableData = await fetchTables();

                const areaWithTableNames = areaData.map((area) => ({
                    ...area,
                    nameList: area.tableIdList.map((tableId) => {
                        const table = tableData.find((table) => table.tableId === tableId);
                        return table ? table.name : null;
                    })
                }));

                setAreas(areaWithTableNames);
                setFilteredAreas(areaWithTableNames);
            } catch (error) {
                console.error('Failed to fetch areas:', error);
            } finally {
                setLoading(false);
            }
        };

        getAreas();
    }, []);

    useEffect(() => {
        let filtered = areas;

        if (isAvailableOnly) {
            filtered = filtered.filter((area) => area.isAvailable);
        }

        setFilteredAreas(filtered);
    }, [isAvailableOnly, areas]);

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const handleToggleAvailable = () => {
        setIsAvailableOnly((prev) => !prev);
    };

    const handleUpdateArea = async (updatedArea) => {
        try {
            // Call your API to update the area
            // const result = await updateArea(updatedArea);

            // Update the areas state with the new data
            setAreas(prevAreas =>
                prevAreas.map(a =>
                    a.areaId === updatedArea.areaId ? updatedArea : a
                )
            );

            setSelectedArea(null);
            setOpenDialog(false);
        } catch (error) {
            console.error('Failed to update area:', error);
        }
    };

    const handleAddTable = (areaId) => {
        // Implement the logic to add a new table
        console.log('Add table to area:', areaId);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 5 }}>
                Areas
            </Typography>

            <Stack
                direction="row"
                alignItems="center"
                flexWrap="wrap-reverse"
                justifyContent="flex-end"
                sx={{ mb: 5 }}
            >
                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                    <AreaFilters
                        openFilter={openFilter}
                        onOpenFilter={handleOpenFilter}
                        onCloseFilter={handleCloseFilter}
                        isAvailableOnly={isAvailableOnly}
                        onToggleAvailable={handleToggleAvailable}
                    />
                </Stack>
            </Stack>

            <Grid container spacing={3}>
                {filteredAreas.map((area) => (
                    <Grid key={area.areaId} item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            {area.name}
                        </Typography>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {area.nameList.map((tableName) => (
                                <div key={tableName} style={{ flex: '1 0 10%', boxSizing: 'border-box', padding: '8px' }}>
                                    <TableCard tableName={tableName} />
                                </div>
                            ))}
                        </div>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleAddTable(area.areaId)}
                            sx={{ mt: 2 }}
                        >
                            Add Table
                        </Button>
                    </Grid>
                ))}
            </Grid>

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="area-detail-dialog"
                maxWidth="lg"
                fullWidth
            >
                {selectedArea && (
                    <AreaDetail
                        area={selectedArea}
                        onUpdate={handleUpdateArea}
                    />
                )}
            </Dialog>
        </Container>
    );
}
