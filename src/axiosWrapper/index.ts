import type { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';

import axios from 'axios';
import { AuthService } from 'src/sections/auth/authService';

const mainServerURL = import.meta.env.VITE_API_URL;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: mainServerURL,
  timeout: 30000, // Set a timeout for requests
});

// Maintenance mode state
let isInMaintenanceMode = false;

// Function to check if we're already on the maintenance page
const isOnMaintenancePage = () => window.location.pathname === '/maintenance';

// Function to redirect to maintenance page
const redirectToMaintenance = () => {
  if (!isOnMaintenancePage()) {
    window.location.href = '/maintenance';
  }
};

// Interceptor to include the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    // If in maintenance mode and not on maintenance page, redirect
    if (isInMaintenanceMode && !isOnMaintenancePage()) {
      redirectToMaintenance();
      return Promise.reject(new Error('System is in maintenance mode'));
    }

    // const token = sessionStorage.getItem('authToken');
    const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoicm9vdEBnYm5ld3MudWsiLCJ0eXBlIjoiYWNjZXNzIiwicGVybWlzc2lvbnMiOlsiZGFzaGJvYXJkOmFuYWx5dGljcyIsImRhc2hib2FyZDp2aWV3IiwicGVybWlzc2lvbnM6Y3JlYXRlIiwicGVybWlzc2lvbnM6ZGVsZXRlIiwicGVybWlzc2lvbnM6cmVhZCIsInBlcm1pc3Npb25zOnVwZGF0ZSIsInJvbGVzOmNyZWF0ZSIsInJvbGVzOmRlbGV0ZSIsInJvbGVzOnJlYWQiLCJyb2xlczp1cGRhdGUiLCJzeXN0ZW06YWRtaW4iLCJzeXN0ZW06Y29uZmlnIiwic3lzdGVtOnNldHRpbmdzIiwidXNlcnM6Y3JlYXRlIiwidXNlcnM6ZGVsZXRlIiwidXNlcnM6cmVhZCIsInVzZXJzOnVwZGF0ZSIsIndhbGxldHM6ZGVsZXRlIiwid2FsbGV0czpyZWFkIiwid2FsbGV0czp1cGRhdGUiXSwiaWF0IjoxNzU3NDQzODI5LCJleHAiOjE3NTc1MzAyMjl9.BaQvJOnIofUKQCTu_cxBeXwFX3qG4NqDlXRcL9NAIak';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token expiry and maintenance mode
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle maintenance mode (503 Service Unavailable)
    if (error.response?.status === 503) {
      isInMaintenanceMode = true;
      redirectToMaintenance();
      return Promise.reject(error);
    }

    // Handle token expiry (401 Unauthorized)
    if (error.response?.status === 401) {
      const authService = new AuthService();
      authService.logout();
    }
    return Promise.reject(error);
  }
);

// Wrapper function for GET requests
export const axiosGet = async (url: string, params?: Record<string, any>): Promise<AxiosResponse | null> => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response;
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 503) {
      return null;
    }
    console.error('GET request failed:', error.response?.data || error.message);
    return null;
  }
};

// Wrapper function for POST requests
export const axiosPost = async (
  url: string,
  body?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<AxiosResponse | null> => {
  try {
    const response = await axiosInstance.post(url, body, config);
    return response;
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 503) {
      return null;
    }
    console.error('POST request failed:', error.response?.data || error.message);
    return null;
  }
};

// Wrapper function for PUT requests
export const axiosPut = async (
  url: string,
  body?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<AxiosResponse | null> => {
  try {
    const response = await axiosInstance.put(url, body, config);
    return response;
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 503) {
      return null;
    }
    console.error('PUT request failed:', error.response?.data || error.message);
    return null;
  }
};

// Wrapper function for DELETE requests
export const axiosDelete = async (
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse | null> => {
  try {
    const response = await axiosInstance.delete(url, config);
    return response;
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 503) {
      return null;
    }
    console.error('DELETE request failed:', error.response?.data || error.message);
    return null;
  }
};

