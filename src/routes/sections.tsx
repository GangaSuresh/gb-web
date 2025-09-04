import Box from '@mui/material/Box';
import { lazy, Suspense } from 'react';
import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { PERMISSIONS } from 'src/constants/permissions';
import { AuthGuard } from 'src/sections/auth/authGaurd';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { SimpleLayout } from 'src/layouts/simple';


// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Page403 = lazy(() => import('src/pages/page-unauthorized'));
export const MaintenancePage = lazy(() => import('src/pages/maintenance'));
export const VaultPage = lazy(() => import('src/pages/vault'));
export const CoinPage = lazy(() => import('src/pages/coin'));
export const LpPage = lazy(() => import('src/pages/lp'));


// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      path: 'maintenance',
      element: <MaintenancePage />,
    },
    {
      element: (
        <SimpleLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </SimpleLayout>
      ),
      // children: [
      //   {
      //     element: (
      //       <AuthGuard requiredPermissions={[]}>
      //         <HomePage />
      //       </AuthGuard>
      //     ),
      //     index: true,
      //   },
      // ],
      children: [
        {
          element: (

              // <HomePage />
              <VaultPage/> 
          ),
          index: true,
        },
        { path: 'vault/*', element:<VaultPage/> },
        { path: 'coin/*', element:<CoinPage/> },
        { path: 'lp/*', element:<LpPage/> },
      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: 'unauthorized',
      element: <Page403 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
