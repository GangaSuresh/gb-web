import { useMemo, useEffect } from 'react';
import { getProfile } from 'src/redux/authThunk';
import { useSelector, useDispatch } from 'react-redux';
import { AuthService } from 'src/sections/auth/authService';

import type { RootState, AppDispatch } from '../redux/store';

export const useProfileIfMissingData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.userInfo);
   const authService = useMemo(() => new AuthService(), []);

  useEffect(() => {
    if (authService.isAuthenticated() && userData.email === '') {
      dispatch(getProfile());
    }
  }, [authService, dispatch, userData]);
};