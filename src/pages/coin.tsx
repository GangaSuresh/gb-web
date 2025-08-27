import CoinView from 'src/sections/coin';
import { CONFIG } from 'src/config-global';
import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

export default function CoinPage() {
  return (
    <>
      <Helmet>
        <title> {`Coin - ${CONFIG.appName}`}</title>
      </Helmet>

      <CoinView />
    </>
  );
}
