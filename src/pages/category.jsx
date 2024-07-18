import { Helmet } from 'react-helmet-async';

import { CategoryView } from 'src/sections/category/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
    return (
        <>
            <Helmet>
                <title> Category </title>
            </Helmet>

            <CategoryView />
        </>
    );
}
