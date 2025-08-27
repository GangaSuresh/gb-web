import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Logo } from 'src/components/logo';
import { useState, useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import { usePathname } from 'src/routes/hooks';
import { useTheme } from '@mui/material/styles';
import { Iconify } from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { Scrollbar } from 'src/components/scrollbar';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { PermissionGuard } from 'src/components/permissionGaurd';

// ----------------------------------------------------------------------

export type NavContentProps = {
  data: {
    path: string;
    title: string;
    icon: React.ReactNode;
    info?: React.ReactNode;
    requiredPermissions?: string[];
  }[];
  userFunc: {
    path: string;
    title: string;
    icon: React.ReactNode;
    info?: React.ReactNode;
  }[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  userFunc,
  slots,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        bgcolor: 'var(--layout-nav-bg)',
        borderRight: (them) => `solid 2px ${them.palette.divider}`,
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',

        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} userFunc={userFunc} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  userFunc,
  open,
  slots,
  onClose,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          bgcolor: 'var(--layout-nav-bg)',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} userFunc={userFunc} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------
type NavItem = {
  path: string;
  title: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
  requiredPermissions?: string[];
  subItems?: NavItem[];
};

export function NavContent({ data, slots, sx, userFunc }: NavContentProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (path: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const renderNavItem = (item: NavItem, isUserFunc = false) => {
    const isActived =
      item.path === pathname ||
      (item.subItems && item.subItems.some((subItem) => subItem.path === pathname));
    const isExpanded = expandedItems[item.path];

    return (
      <PermissionGuard key={item.title} to={item.requiredPermissions || []}>
        <ListItem disableGutters disablePadding key={item.title}>
          <Box display="flex" flexDirection="column" width="100%">
            <ListItemButton
              disableGutters
              component={item.subItems ? 'div' : RouterLink}
              href={item.subItems ? undefined : item.path}
              onClick={item.subItems ? () => toggleExpand(item.path) : undefined}
              sx={{
                pl: 2,
                py: 1,
                gap: 2,
                pr: 1.5,
                borderRadius: 0.75,
                typography: 'body2',
                fontWeight: 'fontWeightMedium',
                color: 'var(--layout-nav-item-color)',
                minHeight: 'var(--layout-nav-item-height)',
                ...(isActived && {
                  fontWeight: 'fontWeightSemiBold',
                  bgcolor: 'var(--layout-nav-item-active-bg)',
                  color: 'var(--layout-nav-item-active-color)',
                  '&:hover': {
                    bgcolor: 'var(--layout-nav-item-hover-bg)',
                  },
                }),
              }}
            >
              <Box component="span" sx={{ width: 24, height: 24 }}>
                {item.icon}
              </Box>

              <Box component="span" flexGrow={1}>
                {item.title}
              </Box>

              {item.subItems ? (
                <Iconify
                  icon={isExpanded ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'}
                  width={20}
                />
              ) : (
                item.info && item.info
              )}
            </ListItemButton>

            {item.subItems && isExpanded && (
              <Box component="ul" sx={{ pl: 4 }}>
                {item.subItems.map((subItem) => renderNavItem(subItem, isUserFunc))}
              </Box>
            )}
          </Box>
        </ListItem>
      </PermissionGuard>
    );
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Logo />
      </Box>

      {slots?.topArea}
      <Scrollbar fillContent>
        <Box
          component="nav"
          display="flex"
          flex="1 1 auto"
          flexDirection="column"
          sx={sx}
          justifyContent="space-between"
        >
          <Box component="ul" gap={0.5} display="flex" flexDirection="column">
            {data.map((item) => renderNavItem(item))}
          </Box>
          <Box component="ul" gap={0.5} display="flex" flexDirection="column">
            {userFunc.map((item) => renderNavItem(item, true))}
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}
    </>
  );
}
