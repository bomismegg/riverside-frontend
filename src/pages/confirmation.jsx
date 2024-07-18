import { Helmet } from 'react-helmet-async';

import { ConfirmationView } from 'src/sections/confirmation';

// ----------------------------------------------------------------------

export default function LoginPage() {
    return (
        <>
            <Helmet>
                <title> Login </title>
            </Helmet>

            <ConfirmationView />
        </>
    );
}
