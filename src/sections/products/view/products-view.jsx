import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fetchProducts, fetchCategories } from 'src/api/products';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductDetail from '../product-detail';
import ProductFilters from '../product-filters';

export default function ProductsView() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    const getProducts = async () => {
      try {
        const productData = await fetchProducts();
        setProducts(productData);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
    getProducts();
  }, []);

  useEffect(() => {
    const groupByCategory = (productList) => productList.reduce((acc, product) => {
        const category = product.dishCategoryId;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      }, {});

    let filtered = products;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.dishCategoryId));
    }

    if (isAvailableOnly) {
      filtered = filtered.filter((product) => product.isAvailable);
    }

    setFilteredProducts(groupByCategory(filtered));
  }, [selectedCategories, isAvailableOnly, products]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      }
      return [...prev, categoryId];
    });
  };

  const handleToggleAvailable = () => {
    setIsAvailableOnly((prev) => !prev);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      // Call your API to update the product
      // const result = await updateProduct(updatedProduct);
      
      // Update the products state with the new data
      setProducts(prevProducts => 
        prevProducts.map(p => 
          p.dishId === updatedProduct.dishId ? updatedProduct : p
        )
      );
      
      setSelectedProduct(null);
      setOpenDialog(false);
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleToggleAvailability = async (dishId, newAvailability) => {
    try {
      // Call the API to update the product availability
      // const updatedProduct = await updateProductAvailability(dishId, newAvailability);
      
      // Update the products state with the new data
      // setProducts(prevProducts => 
      //   prevProducts.map(p => 
      //     p.dishId === dishId ? {...p, isAvailable: newAvailability} : p
      //   )
      // );

      // Optionally, you can show a success message to the user
      // For example, if you're using a snackbar or toast notification:
      // showNotification('Product availability updated successfully');
    } catch (error) {
      console.error('Failed to update product availability:', error);
      
      // Optionally, show an error message to the user
      // showNotification('Failed to update product availability', 'error');
    }
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
            categories={categories}
            selectedCategories={selectedCategories}
            onSelectCategory={handleSelectCategory}
            isAvailableOnly={isAvailableOnly}
            onToggleAvailable={handleToggleAvailable}
          />
          <ProductSort />
        </Stack>
      </Stack>

      {Object.keys(filteredProducts).map((categoryId) => {
        const category = categories.find((cat) => cat.dishCateGoryId === categoryId);
        return (
          <div key={categoryId}>
            <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
              {category ? category.name : 'Unknown Category'}
            </Typography>
            <Grid container spacing={3}>
              {filteredProducts[categoryId].map((product) => (
                <Grid key={product.dishId} xs={12} sm={6} md={3}>
                  <ProductCard
                    product={product}
                    onEdit={handleUpdateProduct}
                    onToggleAvailability={handleToggleAvailability}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        );
      })}

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