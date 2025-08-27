import type { SelectProps, SelectChangeEvent } from '@mui/material';

import React from 'react';

import { Box, Chip, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';

interface MultiSelectComponentProps {
  label: string;
  options: { label: string; value: string | number }[];
  value: (string | number)[];
  error?: boolean;
  onChange?: (event: SelectChangeEvent<unknown>) => void;
  helperText?: string;
  selectProps?: SelectProps;
}

const MultiSelectComponent: React.FC<MultiSelectComponentProps> = ({
  label,
  options,
  error = false,
  value,
  onChange,
  helperText = '',
  selectProps,
}) => (
  <FormControl fullWidth variant="outlined" error={error}>
    <InputLabel>{label}</InputLabel>
    <Select
      multiple
      value={value}
      onChange={onChange}
      label={label}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {(selected as (string | number)[]).map((val) => {
            const option = options.find(opt => opt.value === val);
            return option ? <Chip key={val} label={option.label} /> : null;
          })}
        </Box>
      )}
      {...selectProps}
    >
      {options.map((option) => (
        <MenuItem key={option.label} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
    {error && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

export default MultiSelectComponent;
