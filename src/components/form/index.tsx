import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { parse, format } from 'date-fns';

import {
  Grid,
  Radio,
  Checkbox,
  TextField,
  FormLabel,
  RadioGroup,
  FormControl,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
  createFilterOptions
} from '@mui/material';

import MultiInput from '../multiInput';
import SelectComponent from '../select';
import MultiSelect from '../multiselectComponent';

// Define the structure for the input configuration
export interface Config {
  name: string;
  label: string;
  type:
    | 'textfield'
    | 'select'
    | 'radio'
    | 'multiinput'
    | 'multiselect'
    | 'number'
    | 'date'
    | 'autocomplete'
    | 'checkbox';
  required?: boolean;
  options?: { value: any; label: string }[]; // For select and radio inputs
  fullwidth?: boolean;
  conditionalRender?: { field: string; value: string };
  props?: any;
}

// Props for the generative form component
interface GenerativeFormProps {
  config: Config[];
  formValues: any;
  errors: any;
  handleChange: (name: string, value: string | string[] | number|boolean) => void;
  staticData?:any;
  errorMessages?: Record<string, string>;
}

const GenerativeForm: React.FC<GenerativeFormProps> = ({
  config,
  formValues,
  errors,
  handleChange,
  staticData,
  errorMessages = {}
}) => {
  const renderField = (field: Config) => {
    const isError = errors[field.name];
    const helperText = isError ? (errorMessages[field.name] || `${field.label} is required`) : '';
    const label = `${field.label}${field.required ? ' *' : ''}`;
    if (field.conditionalRender) {
      if (formValues[field.conditionalRender.field] !== field.conditionalRender.value) {
        return null;
      }
    }
    switch (field.type) {
      case 'textfield': {
        return (
          <TextField
            fullWidth
            label={label}
            value={formValues[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            error={isError}
            helperText={helperText}
            {...field.props}
          />
        );
      }
      case 'checkbox': {
        return (
          <FormControlLabel
          control={
            <Checkbox
              checked={!!formValues[field.name]}
              onChange={(e) => handleChange(field.name, e.target.checked)}
            />
          }
          label={label}
        />
          
        );
      }
      case 'multiinput':
        return (
          <MultiInput
            label={label}
            onChange={(vals) => {
              handleChange(field.name, vals);
            }}
            data={formValues[field.name] ?? []}
            error={isError}
            helperText={helperText}
          />
        );
      case 'select':
        return (
          <SelectComponent
            label={label}
            options={field?.options ?? []}
            value={formValues[field.name] ?? ''}
            onChange={(e) => handleChange(field.name, e.target.value as string)}
            error={isError}
            helperText={helperText}
          />
        );
      case 'multiselect':
        return (
          <MultiSelect
            label={label}
            options={field?.options ?? []}
            value={formValues[field.name] ?? []}
            onChange={(e) => handleChange(field.name, e.target.value as string)}
            error={isError}
            helperText={helperText}
          />
        );
        case 'date': {
          const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const formattedDate = format(parse(e.target.value, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy');
            handleChange(field.name, formattedDate);
          };
        
          return (
            <TextField
              label={label}
              type="date"
              value={formValues[field.name] ? format(parse(formValues[field.name], 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd') : ''}
              onChange={handleDateChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              error={isError}
              helperText={helperText}
            />
          );
        }
      case 'radio':
        return (
          <FormControl component="fieldset" error={isError}>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
              row
              value={formValues[field.name]??''}
              onChange={(e) => handleChange(field.name, e.target.value)}
            >
              {field.options?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {isError && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );
      case 'autocomplete': {
        const filterOptions = createFilterOptions({
          matchFrom: 'start',
          stringify: (option: { label: string; value: any }) => option.label,
        });
        const currentValue =
          field.options?.find((option) => option.value === formValues[field.name]) || null;
        return (
          <Autocomplete
            value={currentValue}
            onChange={(_event, newValue: { value: any; label: string } | null) => {
              handleChange(field.name, newValue?.value ?? '');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant="outlined"
                error={isError}
                helperText={helperText}
              />
            )}
            options={field?.options ?? []}
            filterOptions={filterOptions}
            isOptionEqualToValue={(option, value) => option.value === value.value}
          />
        );
      }

      default:
        return null;
    }
  };

  return (
    <Grid container>
      {config.map((field) => (
        <Grid
          item
          xs={12}
          md={field?.fullwidth ? 12 : 6}
          lg={field?.fullwidth ? 12 : 6}
          key={field.label}
          sx={{ p: '1rem 1rem 0 0' }}
        >
          {renderField(field)}
        </Grid>
      ))}
    </Grid>
  );
};

export default GenerativeForm;
