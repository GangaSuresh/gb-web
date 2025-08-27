/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { axiosGet } from 'src/axiosWrapper';
import { LOGIN,USER_PROFILE} from 'src/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { setUserInfo } from './userInfoSlice';


const mainServerURL = import.meta.env.VITE_USER_API_URL;

export const loginThunk = createAsyncThunk(
    "auth/login",
    async ({ identifier, password }: { identifier: string; password: string },{ dispatch, rejectWithValue }) => {
      try {
        const response = await axios.post(`${mainServerURL}${LOGIN}`, { email:identifier, password });
        if(response.status===200){
          sessionStorage.setItem("authToken", response.data.data.token);
          const {createdAt,__v,...userData}=response.data.data.user
          dispatch(setUserInfo(userData));
        }
        return response.status;
      } catch (error) {
        return rejectWithValue(
          error
        );
      }
    }
  );

  export const getProfile = createAsyncThunk(
    "userInfo/login",
    async (_,{ dispatch, rejectWithValue }) => {
      try {
        const response = await axiosGet(mainServerURL + USER_PROFILE);
        if(response){
          const {createdAt,__v,...userData}=response.data.data;
          dispatch(setUserInfo(userData));
        }
        return true;
      } catch (error) {
        return rejectWithValue(
          error
        );
      }
    }
  );

