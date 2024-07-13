import { Helmet } from 'react-helmet-async';

import useAuth from 'src/hooks/use-auth';

import { AreaView } from 'src/sections/area/view';

// ----------------------------------------------------------------------

export default function UserPage() {
    useAuth()
    return (
        <>
            <Helmet>
                <title> Table </title>
            </Helmet>

            <AreaView />
        </>
    );
}
