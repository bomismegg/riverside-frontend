import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { products } from 'src/_mock/products';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductDetail from '../product-detail';
import ProductFilters from '../product-filters';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleUpdateProduct = (updatedProduct) => {
    console.log('Updated product:', updatedProduct);
    setSelectedProduct(null);
    setOpenDialog(false);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} onClick={() => { setSelectedProduct(product); setOpenDialog(true); }} />
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="product-detail-dialog"
        maxWidth="lg"
        fullWidth
      >
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onUpdate={handleUpdateProduct}
          />
        )}
      </Dialog>
    </Container>
  );
}
