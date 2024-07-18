import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { activateAccount } from 'src/api/user';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function ConfirmationView() {
    const theme = useTheme();
    const router = useRouter();

    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await activateAccount(token);
            toast.success('Confirmation successful!', {
                position: "top-right"
            });

            setTimeout(() => {
                router.push('/login');
            }, 1000);
        } catch (err) {
            toast.error('Confirmation failed. Please check your token.', {
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    const renderForm = (
        <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    name="token"
                    label="Confirmation Token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                    inputProps={{ maxLength: 6 }}
                />
            </Stack>

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                loading={loading}
                sx={{ mt: 3 }}
            >
                Confirm
            </LoadingButton>
        </form>
    );

    return (
        <Box
            sx={{
                ...bgGradient({
                    color: alpha(theme.palette.background.default, 0.9),
                    imgUrl: '/assets/background/overlay_4.jpg',
                }),
                height: 1,
            }}
        >
            <Logo
                sx={{
                    position: 'fixed',
                    top: { xs: 16, md: 24 },
                    left: { xs: 16, md: 24 },
                }}
            />

            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}
                >
                    <Typography variant="h4">Enter Confirmation Token</Typography>

                    <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                        Please enter the 6-digit confirmation token sent to your email.
                    </Typography>

                    {renderForm}
                </Card>
            </Stack>
            <ToastContainer />
        </Box>
    );
}
