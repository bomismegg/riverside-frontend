import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { Stack, Button, Container, Typography } from '@mui/material';

import { fetchUsers, updateUser, deleteUser, registerUser } from 'src/api/user';

import Iconify from 'src/components/iconify';

import UserTableView from '../user-table-view';
import UserDetailsDialog from '../user-details';

export default function UserView() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [submitButtonLabel, setSubmitButtonLabel] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userData = await fetchUsers();
      setUsers(userData.content);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      toast.success('User deleted successfully!', {
        position: 'top-right',
      })
      fetchData();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (dialogTitle === 'Create New User') {
        currentUser.password = '123'
        console.log(currentUser)
        await registerUser(currentUser);
        toast.success('User created successfully!, default password is 123', {
          position: 'top-right',
        })
      } else {
        await updateUser(currentUser);
        toast.success('User updated successfully!', {
          position: 'top-right',
        })
      }
      fetchData();
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to submit user:', error);
    }
  };

  const handleOpenDialog = (user) => {
    if (user) {
      setCurrentUser(user);
      setDialogTitle('Update User');
      setSubmitButtonLabel('Update');
    } else {
      setCurrentUser({});
      setDialogTitle('Create New User');
      setSubmitButtonLabel('Create');
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleOpenDialog(null)}>
          New User
        </Button>
      </Stack>
      <UserTableView
        users={users}
        onUpdateUser={handleOpenDialog}
        onDeleteUser={handleDeleteUser}
      />
      <UserDetailsDialog
        open={openDialog}
        onClose={handleCloseDialog}
        formData={currentUser}
        onChange={handleChange}
        onSubmit={handleSubmit}
        dialogTitle={dialogTitle}
        submitButtonLabel={submitButtonLabel}
      />
      <ToastContainer/>
    </Container>
  );
}

