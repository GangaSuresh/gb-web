/* eslint-disable object-shorthand */
import type { Dayjs } from 'dayjs';

import dayjs from 'dayjs';
import React, { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker, LocalizationProvider } from '@mui/x-date-pickers';

interface MultiTimePickerProps {
  label: string;
  value: string[]; // List of time strings (e.g., ["12:30", "14:45"])
  onChange: (newValue: string[]) => void;
  error?: boolean;
  helperText?: string;
}

const MultiTimePicker: React.FC<MultiTimePickerProps> = ({
  label,
  value,
  onChange,
  error = false,
  helperText = '',
}) => {
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);

  // Convert string values to Dayjs objects for display
  const times = value.map((time) => dayjs(time, 'HH:mm'));

  // Handle time selection from the picker
  const handleTimeChange = (newValue: Dayjs | null) => {
    setSelectedTime(newValue);
  };

  // Handle when the time selection is accepted
  const handleAccept = (newValue: Dayjs | null) => {
    if (newValue) {
      const newTime = newValue.format('HH:mm');
      // Only add if not already in list and not the same as last added
      if (!value.includes(newTime) ) {
        onChange([...value, newTime]);
      }
    }
    setSelectedTime(null);
  };

  // Remove a time from the list
  const handleRemoveTime = (timeToRemove: string) => {
    onChange(value.filter((time) => time !== timeToRemove));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Box sx={{ mb: 2 }}>
          <MobileTimePicker
            label={label}
            value={selectedTime}
            onChange={handleTimeChange}
            onAccept={handleAccept}
            ampm={false}
            
            slotProps={{
              textField: {
                fullWidth: true,
                error: error,
                helperText: error && helperText,
              },
              actionBar: {
                actions: ['cancel', 'accept'],
              },
            }}
          />
        </Box>

        {/* Display selected times as chips */}
        <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap" useFlexGap>
          {times.map((time, index) => (
            <Chip
              key={index}
              label={time.format('HH:mm')}
              onDelete={() => handleRemoveTime(time.format('HH:mm'))}
              deleteIcon={<DeleteIcon />}
              variant="outlined"
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};

export default MultiTimePicker;