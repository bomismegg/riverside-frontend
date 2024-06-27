import { Helmet } from 'react-helmet-async';

import useAuth from 'src/hooks/use-auth';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  useAuth()
  return (
    <>
      <Helmet>
        <title> Products </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
