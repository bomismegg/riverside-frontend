import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { fetchDishCategories } from 'src/api/category';

import CategoryTableView from '../category-table-view';

export default function CategoryView() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryData = await fetchDishCategories();
                console.log(categoryData);
                setCategories(categoryData);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">
                    Categories
                </Typography>
            </Stack>
            <CategoryTableView categories={categories} />
        </Container>
    );
}

