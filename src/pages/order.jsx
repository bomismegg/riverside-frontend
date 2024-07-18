import { Helmet } from 'react-helmet-async';

import useAuth from 'src/hooks/use-auth';

import { OrderView } from 'src/sections/orders/view';

// ----------------------------------------------------------------------

export default function OrderPage() {
    useAuth()
    return (
        <>
            <Helmet>
                <title> Order </title>
            </Helmet>

            <OrderView />
        </>
    );
}
