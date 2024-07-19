import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fetchDishCategories } from 'src/api/category';
import { createDish, updateDish, fetchDishes } from 'src/api/dishes';

import Iconify from 'src/components/iconify';

import ProductCard from '../product-card';
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
  const [isCreatingNewProduct, setIsCreatingNewProduct] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoryData = await fetchDishCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    const getProducts = async () => {
      try {
        const productData = await fetchDishes();
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
    const groupByCategory = (productList) =>
      productList.reduce((acc, product) => {
        const category = product.dishCategoryId;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      }, {});

    let filtered = products;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.dishCategoryId)
      );
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

  const handleOpenDialog = (product = null, isNew = false) => {
    setSelectedProduct(product || {});
    setIsCreatingNewProduct(isNew);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
    setOpenDialog(false);
    setIsCreatingNewProduct(false);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    const newProductJson = Object.fromEntries(
      [...updatedProduct].map((entry) => {
        if (entry[0] === 'dishPrice') {
          return [entry[0], Number(entry[1])];
        }
        return entry;
      })
    );
    try {
      await updateDish(newProductJson);
      toast.success('Product updated successfully!');
      handleCloseDialog();
      
      // Refetch products and categories after successful update
      const productData = await fetchDishes();
      setProducts(productData);
      const categoryData = await fetchDishCategories();
      setCategories(categoryData);
    } catch (error) {
      console.error('Failed to update product:', error);
      toast.error('Failed to update product.');
    }
  };
  

  const handleCreateProduct = async (newProductData) => {
    const newProductJson = Object.fromEntries(
      [...newProductData].map((entry) => {
        if (entry[0] === 'dishPrice') {
          return [entry[0], Number(entry[1])];
        }
        return entry;
      })
    );

    try {
      const createdProduct = await createDish(newProductJson);
      setProducts((prevProducts) => [...prevProducts, createdProduct]);
      toast.success('Product created successfully!');
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to create product:', error);
      toast.error('Failed to create product.');
    }
  };

  const handleToggleAvailability = async (dishId, newAvailability) => {
    try {
      const product = products.find((prod) => prod.dishId === dishId);
      delete product.imageURL;
      if (product) {
        product.isAvailable = newAvailability;
        await updateDish(product);
        toast.success('Product availability updated successfully!');
        const productData = await fetchDishes();
        setProducts(productData);
      }
    } catch (error) {
      console.error('Failed to update product availability:', error);
      toast.error('Failed to update product availability.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Dishes
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
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => handleOpenDialog(null, true)}
          >
            New Dish
          </Button>
        </Stack>
      </Stack>

      {Object.keys(filteredProducts).map((categoryId) => {
        const category = categories.find(
          (cat) => cat.dishCateGoryId === categoryId
        );
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
                    onEdit={handleOpenDialog}
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
        onClose={handleCloseDialog}
        aria-labelledby="product-detail-dialog"
        maxWidth="md"
        fullWidth
      >
        {selectedProduct && (
          <ProductDetail
            product={isCreatingNewProduct ? {} : selectedProduct}
            isUpdate={!isCreatingNewProduct}
            onUpdate={isCreatingNewProduct ? handleCreateProduct : handleUpdateProduct}
            open={openDialog}
            onClose={handleCloseDialog}
          />
        )}
      </Dialog>
      <ToastContainer />
    </Container>
  );
}
