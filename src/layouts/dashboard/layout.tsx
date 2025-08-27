import type { RootState } from 'src/redux/store';
import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { Iconify } from 'src/components/iconify';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { AuthService } from 'src/sections/auth/authService';

import { Main } from './main';
import { layoutClasses } from '../classes';
import { NavMobile, NavDesktop } from './nav';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { navData,navUserFunc } from '../config-nav-dashboard';

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function DashboardLayout({ sx, children, header }: DashboardLayoutProps) {
  const theme = useTheme();
  const { userData } = useSelector((state: RootState) => state.userInfo);
  const authService = new AuthService();

  const [navOpen, setNavOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const layoutQuery: Breakpoint = 'lg';

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileClose();
    authService.logout();
  };

  const getUserInitials = () => {
    if (userData.email) {
      return userData.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const open = Boolean(anchorEl);

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: { px: { [layoutQuery]: 5 } },
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              // <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
              //   This is an info Alert.
              // </Alert>
              <></>
            ),
            leftArea: (
              <>
                <IconButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    display: { [layoutQuery]: 'none' },
                    mr: 1,
                  }}
                >
                  <Iconify icon="eva:menu-fill" width={24} />
                </IconButton>
                <NavMobile
                  data={navData}
                  open={navOpen}
                  userFunc={navUserFunc}
                  onClose={() => setNavOpen(false)}
                />
              </>
            ),
            rightArea: (
              <Box gap={1} display="flex" alignItems="center">
                <IconButton
                  onClick={handleProfileClick}
                  sx={{
                    p: 0.5,
                    border: '2px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: 'primary.main',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {getUserInitials()}
                  </Avatar>
                </IconButton>
                
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleProfileClose}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      minWidth: 200,
                      boxShadow: theme.shadows[8],
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <Box sx={{ p: 2, pb: 1 }}>
                    <Typography variant="subtitle2" noWrap>
                      {userData.email || 'User'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                      {userData.role || 'Role not specified'}
                    </Typography>
                  </Box>
                  
                  <Divider />
                  
                  <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                    <Iconify icon="eva:log-out-outline" width={20} sx={{ mr: 1.5 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop data={navData} layoutQuery={layoutQuery} userFunc={navUserFunc} />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-nav-vertical-width': '300px',
        '--layout-dashboard-content-pt': theme.spacing(1),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: 'var(--layout-nav-vertical-width)',
          },
        },
        ...sx,
      }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
