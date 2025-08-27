import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { MaintenanceView } from 'src/sections/maintenance';

// ----------------------------------------------------------------------

export default function MaintenancePage() {
  return (
    <>
      <Helmet>
        <title>{`Maintenance - ${CONFIG.appName}`}</title>
      </Helmet>

      <MaintenanceView />
    </>
  );
} 