import HomeView from 'src/sections/home';
import { CONFIG } from 'src/config-global';
import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> {`Home - ${CONFIG.appName}`}</title>
      </Helmet>

      <HomeView />
    </>
  );
}
