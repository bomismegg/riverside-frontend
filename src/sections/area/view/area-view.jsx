import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fetchAreas } from 'src/api/area';

import AreaCard from '../area-card';
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
                setAreas(areaData);
                setFilteredAreas(areaData);
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

    if (loading) {
        return <div>Loading...</div>;
    }

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

    const handleToggleAvailability = async (areaId, newAvailability) => {
        try {
            // Call the API to update the area availability
            // const updatedArea = await updateAreaAvailability(areaId, newAvailability);

            // Update the areas state with the new data
            // setAreas(prevAreas => 
            //   prevAreas.map(a => 
            //     a.areaId === areaId ? {...a, isAvailable: newAvailability} : a
            //   )
            // );

            // Optionally, you can show a success message to the user
            // For example, if you're using a snackbar or toast notification:
            // showNotification('Area availability updated successfully');
        } catch (error) {
            console.error('Failed to update area availability:', error);

            // Optionally, show an error message to the user
            // showNotification('Failed to update area availability', 'error');
        }
    };

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
                    <Grid key={area.areaId} xs={12} sm={6} md={3}>
                        <AreaCard
                            area={area}
                            onEdit={handleUpdateArea}
                            onToggleAvailability={handleToggleAvailability}
                        />
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
