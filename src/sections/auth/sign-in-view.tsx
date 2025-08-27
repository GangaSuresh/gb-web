import type {AppDispatch } from 'src/redux/store';

import { useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { loginThunk } from 'src/redux/authThunk';

import { Iconify } from 'src/components/iconify';

import { isValidEmail,isValidPhone,isValidPassword } from './util';

// ----------------------------------------------------------------------

export function SignInView() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [identifier, setIdentifier] = useState('');
  const [identifierError,setIdentifierError]=useState(false);
  const [password, setPassword] = useState('');
  const [passwordError,setPasswordError]=useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  

  const handleSignIn = async () => {
    setError('');
    if (!identifier || !password) {
      setError('(Email or phone) and password are required.');
    }
    else if(!identifierError && !passwordError){
      try {
        await dispatch(loginThunk({ identifier, password })).unwrap();
        navigate('/')
        
      } catch (err) {
        console.log(err)
        setError('Login failed. Please try again');
      }
    }
  };

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="identifier"
        label="Email or phone"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
        value={identifier}
        onChange={(e) => {
          setIdentifierError(!isValidEmail(e.target.value) && !isValidPhone(e.target.value));
          setIdentifier(e.target.value)}}
        error={identifierError}
        helperText={identifierError && 'Enter a valid email or 10-digit phone number'}
      />
      <TextField
        fullWidth
        name="password"
        label="Password"
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
        value={password}
        onChange={(e) => {setPasswordError(!isValidPassword(e.target.value));setPassword(e.target.value);}}
        error={passwordError}
        helperText={passwordError&& 'Password must be at least 6 characters'}
      />
      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      {/* <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
      >
        Sign in
      </LoadingButton> */}
      <Button fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}>Sign in</Button>

    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
      </Box>
      {renderForm}
    </>
  );
}
