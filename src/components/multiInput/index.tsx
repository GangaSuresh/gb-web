import React, { useEffect, useState } from 'react';

import { Box, Chip, TextField, Button } from '@mui/material';

import { Iconify } from '../iconify';

interface MultiInputProps {
  label: string;
  data: string[];
  error?:boolean;
  onChange:  (val:string[]) => void;
  helperText?:string;
}

const MultiInput: React.FC<MultiInputProps> = ({ label, data,error=false,onChange,helperText='' }) => {
  const [values, setValues] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  useEffect(()=>{
    setValues(data)
  },[data])

  const handleAddValue = () => {
    if (inputValue.trim() !== '') {
      setValues([...values, inputValue.trim()]);
      setInputValue('');
      onChange([...values, inputValue.trim()]);
    }
  };

  const handleDelete = (valueToDelete: string) => {
    setValues(values.filter((value) => value !== valueToDelete));
    onChange(values.filter((value) => value !== valueToDelete));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          label={label}
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
          error={error}
          helperText={helperText}
        />
        <Button variant="contained" onClick={handleAddValue}>
        <Iconify icon='material-symbols:add'/>
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {values.map((value, index) => (
          <Chip key={index} label={value} onDelete={() => handleDelete(value)} />
        ))}
      </Box>
    </Box>
  );
};

export default MultiInput;
