import { Helmet } from 'react-helmet-async';

import useAuth from 'src/hooks/use-auth';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  useAuth()
  return (
    <>
      <Helmet>
        <title> User </title>
      </Helmet>

      <UserView />
    </>
  );
}
