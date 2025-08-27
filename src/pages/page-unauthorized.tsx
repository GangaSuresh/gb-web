import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UnauthorizedView } from 'src/sections/error/unauthorized-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`403 Forbidden! | Error - ${CONFIG.appName}`}</title>
      </Helmet>

      <UnauthorizedView />
    </>
  );
}
