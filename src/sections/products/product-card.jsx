import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import Card from '@mui/material/Card';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

export default function ProductCard({ product, onEdit, onToggleAvailability }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  console.log(product);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(product, false);
    handleClose();
  };

  const handleToggleAvailability = () => {
    onToggleAvailability(product.dishId, !product.isAvailable);
    handleClose();
  };

  const renderStatus = (
    <Label
      variant="filled"
      color={product.isAvailable ? 'success' : 'error'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.isAvailable ? 'Available' : 'Unavailable'}
    </Label>
  );

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        {renderStatus}
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <img
            alt={product.name}
            src={product.imageURL}
            style={{
              top: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
            }}
          />
        </Box>
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {product.name}
          </Typography>
        </Link>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            {fCurrency(product.dishPrice)}
          </Typography>
          <IconButton
            color="inherit"
            sx={{
              position: 'relative',
            }}
            onClick={handleClick}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            px: 1,
            width: 200,
            '& .MuiMenuItem-root': {
              borderRadius: 0.75,
              typography: 'body2',
            },
          },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2, width: 20, height: 20 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleToggleAvailability}>
          <Iconify icon="eva:toggle-fill" sx={{ mr: 2, width: 20, height: 20 }} />
          {product.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
        </MenuItem>
      </Menu>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleAvailability: PropTypes.func.isRequired,
};
