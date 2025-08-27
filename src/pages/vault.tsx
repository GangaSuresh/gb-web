import VaultView from 'src/sections/vault';
import { CONFIG } from 'src/config-global';
import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> {`Vault - ${CONFIG.appName}`}</title>
      </Helmet>

      <VaultView />
    </>
  );
}
