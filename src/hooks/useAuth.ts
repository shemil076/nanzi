'use client';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch, RootState } from '@/redux/store';
import { LoginCredentials, RegisterCredentials } from '@/types/auth';
import { login, logout, refreshToken, register } from '@/redux/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading, error, accessToken } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleLogin = async (credentials: LoginCredentials) => {
    await dispatch(login(credentials));
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    await dispatch(register(credentials));
  };

  const handleLogout = async () => {
    await dispatch(logout());
  };

  const handleRefreshToken = async () => {
    try {
      const result = await dispatch(refreshToken()).unwrap();
      return result; // Returns the accessToken string directly
    } catch (error) {
      throw error; // Let the interceptor handle the error
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    accessToken,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    refreshToken: handleRefreshToken,
  };
};
