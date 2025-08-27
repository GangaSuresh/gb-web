import React, { useState } from 'react';
import { Tab, Box, Tabs } from '@mui/material';

import { Iconify } from '../iconify';

interface TabComponentProps {
  tabs: { label: string; content: React.ReactNode; alert?: boolean; }[];
}

const TabComponent: React.FC<TabComponentProps> = ({ tabs }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          sx={{
            display: 'flex',
            width: '100%',
            '& .MuiTabs-flexContainer': {
              justifyContent: 'space-between',
            }
          }}
        >
          {tabs.map((tab, index) => (
            <Tab 
              key={index} 
              label={tab.label}  
              {...a11yProps(index)} 
              sx={{ 
                flex: 1,
                maxWidth: 'none',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
            
              }} 
              icon={tab.alert ? <Iconify icon="jam:alert" sx={{ color: 'var(--error-color)' }} width={20}/> : <></>}
              iconPosition="end"
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index}: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default TabComponent;
