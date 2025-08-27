import { createSlice } from '@reduxjs/toolkit';
import { PermissionService } from 'src/sections/auth/permissionsService';

export interface UserInfo {
  _id: string;
  role: string;
  email: string;
  roles: string[];
  permissions: string[];
  lastLogin: string;
}

interface UserInfoState {
  userData: UserInfo;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserInfoState = {
  userData: {
    _id: '',
    role: '',
    email: '',
    roles:[],
    permissions:[],
    lastLogin: '',
  },
  status: 'idle',
  error: null,
};

const userInfoSlice = createSlice({
  name: 'UserInfo',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      const roles = action.payload.role
      const permissions=PermissionService.getPermissionsForRoles(roles)
      state.userData ={
        ...action.payload,
        roles,
        permissions
      };
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
