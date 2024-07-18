import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { fetchPayments } from 'src/api/payment';

import PaymentsTableView from '../payment-table-view';

export default function PaymentsView() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const paymentData = await fetchPayments();
                console.log(paymentData);
                setPayments(paymentData);
            } catch (error) {
                console.error('Failed to fetch payments:', error);
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
                    Payments
                </Typography>
            </Stack>
            <PaymentsTableView payments={payments} />
        </Container>
    );
}
