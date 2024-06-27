import { Helmet } from 'react-helmet-async';

import useAuth from 'src/hooks/use-auth';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  useAuth()
  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <AppView />
    </>
  );
}
