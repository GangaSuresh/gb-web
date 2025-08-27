import React from 'react';

import { Box } from '@mui/material';

interface CircleProps {
  initials: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
}

const CircleWithText: React.FC<CircleProps> = ({
  initials,
  size = 50,
  backgroundColor,
  textColor = '#fff',
}) => {
  const colors = ['#ff5722', '#4caf50', '#1976d2', '#673ab7', '#ffc107', '#e91e63'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor:backgroundColor || randomColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: textColor,
        fontWeight: 'bold',
        fontSize: size / 2.5, // Adjust font size relative to the circle size
        textTransform: 'uppercase',
      }}
    >
      {initials}
    </Box>
  );
};

export default CircleWithText;
