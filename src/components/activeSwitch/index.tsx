import React, { useState, useEffect } from 'react';

import { Box, Switch, styled } from '@mui/material';

import { Iconify } from '../iconify';

interface ActiveSwitchProps {
  initialStatus: boolean;
  onStatusChange: (newStatus: boolean) => void;
  disabled?: boolean;
}

const ActiveSwitch: React.FC<ActiveSwitchProps> = ({
  initialStatus,
  onStatusChange,
  disabled = false,
}) => {
  const [status, setStatus] = useState(initialStatus);

  // Sync internal state with props
  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const CustomSwitch = styled(Switch)(({ theme }) => ({
    width: 65,
    height: 38,
    padding: 7,
  
    '& .MuiSwitch-switchBase': {
      marginTop: 6,
      marginLeft: 12,
      padding: 0,
      border:'solid',
      transform: 'translateX(-5px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: status ? '#4caf50' : '#f44336',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: status ? '#4caf50' : '#f44336',
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  return (
    <Box display="flex" alignItems="center">
      <Box component="span" mr={1} color="text.secondary">
        Inactive
      </Box>
      <CustomSwitch
        checked={status}
        onChange={(e)=>onStatusChange( e.target.checked)}
        disabled={disabled}
        icon={
           <Iconify icon="charm:cross" width={20}/>
        }
        checkedIcon={
          <Iconify icon='mdi:tick'  width={20}/>
        }
      />
      <Box component="span" ml={1} color="text.secondary">
        Active
      </Box>
    </Box>
  );
};

export default ActiveSwitch;