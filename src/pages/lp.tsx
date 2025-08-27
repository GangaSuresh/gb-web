import LpView from 'src/sections/lp';
import { CONFIG } from 'src/config-global';
import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

export default function LpPage() {
  return (
    <>
      <Helmet>
        <title> {`Liquidity Pool - ${CONFIG.appName}`}</title>
      </Helmet>

      <LpView />
    </>
  );
}
