import type { DrawerProps as MuiDrawerProps} from '@mui/material';

import React from 'react';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Divider, IconButton, Drawer as MuiDrawer } from '@mui/material';

import { Iconify } from '../iconify';

export interface DrawerProps extends Omit<MuiDrawerProps, 'onClose'> {
  drawerWidth?: string;
  open: boolean;
  onClose: () => void;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  showCloseButton?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}


const Drawer: React.FC<DrawerProps> = ({
  drawerWidth = 240,
  open,
  onClose,
  anchor = 'right',
  showCloseButton = true,
  header,
  footer,
  children,
  ...rest
}) => (
    <MuiDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="temporary"
      anchor={anchor}
      open={open}
      onClose={onClose}
      {...rest}
    >
      {header && (
        <Box>
          {header}
          {showCloseButton && (     
            <IconButton onClick={onClose} sx={{position: 'absolute',right: 8,top: 8,color: 'white'}}>
              <Iconify icon="charm:cross" width={30}/>
            </IconButton>
          )}
          <Divider />
        </Box>
      )}
      <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
        {!header && showCloseButton && (
          <IconButton onClick={onClose} sx={{position: 'absolute',right: 8,top: 8,color: (theme) => theme.palette.grey[500]}}>
          <Iconify icon="charm:cross"  width={30}/>
        </IconButton>
        )}{/* if no header */}
        {children}
      </Box>
      
      {footer && (
        <Box>
          <Divider />
          {footer}
        </Box>
      )}
    </MuiDrawer>
  );

export default Drawer;