import type { SelectProps,SelectChangeEvent } from '@mui/material';

import React from 'react';

import { Select, MenuItem, InputLabel, FormControl,FormHelperText } from '@mui/material';

interface SelectComponentProps {
  label: string;
  options: { label: string; value: string | number }[];
  value: string | number;
  error?:boolean;
  onChange?:  (event: SelectChangeEvent<unknown>) => void;
  helperText?:string;
  selectProps?: SelectProps;
}

const SelectComponent: React.FC<SelectComponentProps> = ({ label, options,error=false, value, onChange, selectProps,helperText='' }) => {
  const labelId = `${label}-label`;
  return (

    <FormControl fullWidth variant="outlined" error={error}>
      <InputLabel  id={labelId} shrink>{label}</InputLabel>
      <Select labelId={labelId} value={value} onChange={onChange} label={label} displayEmpty {...selectProps}>
        {options.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
    
  )};

export default SelectComponent;