import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { login, fetchUserById } from 'src/api/user';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await login(email, password);
      const { access_token, refresh_token, account_id } = response.content;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      const user = await fetchUserById(account_id)
      if (user.role !== "MANAGER") {
        toast.error(`${user.role} are not allowed to login.`, {
          position: "top-right",
        });
        return;
      }
      localStorage.setItem('displayName', user.fullName);
      localStorage.setItem('email', user.email);
      localStorage.setItem('photoURL', user.imageURL);

      toast.success('Login successful!', {
        position: "top-right"
      });

      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (err) {
      toast.error('Login failed. Please check your credentials.', {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3} my = {3}>
        <TextField 
          name="email" 
          label="Email address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          required
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        loading={loading}
      >
        Login
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
          <Typography variant="h4">Sign in to Riverside Admin</Typography>

          <Divider sx={{ m: 3 }} />

          {renderForm}
        </Card>
      </Stack>
      <ToastContainer />
    </Box>
  );
}
