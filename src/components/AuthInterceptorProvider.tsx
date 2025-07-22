'use client';

import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/hooks/aueAuth';

axios.defaults.baseURL = 'http://localhost:5001';

export const AuthInterceptorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { refreshToken } = useAuth();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response?.status === 401 &&
          error.config &&
          !error.config.__isRetry
        ) {
          error.config.__isRetry = true;
          try {
            await refreshToken();
            return axios(error.config);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, [refreshToken]);

  return <>{children}</>;
};
