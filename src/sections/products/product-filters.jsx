import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

export default function ProductFilters({
  openFilter,
  onOpenFilter,
  onCloseFilter,
  categories,
  selectedCategories,
  onSelectCategory,
  isAvailableOnly,
  onToggleAvailable,
}) {
  const renderCategory = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Category</Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category.dishCateGoryId}
            control={
              <Checkbox
                checked={selectedCategories.includes(category.dishCateGoryId)}
                onChange={() => onSelectCategory(category.dishCateGoryId)}
              />
            }
            label={category.name}
          />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderAvailability = (
    <Stack>
      <Typography variant="subtitle2">Availability</Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={isAvailableOnly}
            onChange={onToggleAvailable}
          />
        }
        label="Hide Unavailable"
      />
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="h6" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            {renderCategory}
            {renderAvailability}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="button"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={() => {
              onSelectCategory([]);
              onToggleAvailable(false);
            }}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

ProductFilters.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  categories: PropTypes.array,
  selectedCategories: PropTypes.array,
  onSelectCategory: PropTypes.func,
  isAvailableOnly: PropTypes.bool,
  onToggleAvailable: PropTypes.func,
};