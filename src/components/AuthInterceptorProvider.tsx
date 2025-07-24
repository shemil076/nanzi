'use client';

import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/aueAuth';
import { RootState } from '../redux/store';

axios.defaults.baseURL = 'http://localhost:5001';
axios.defaults.withCredentials = true;

export const AuthInterceptorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { refreshToken: refreshTokenAction } = useAuth();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const refreshPromise = useRef<Promise<string | null> | null>(null);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (accessToken && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          console.log(
            'Added Authorization header:',
            config.headers.Authorization,
          );
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response?.status === 401 &&
          error.config &&
          !error.config.__isRetry
        ) {
          error.config.__isRetry = true;
          try {
            if (!refreshPromise.current) {
              refreshPromise.current = refreshTokenAction()
                .then((accessToken) => {
                  refreshPromise.current = null;
                  return accessToken || null;
                })
                .catch((err) => {
                  refreshPromise.current = null;
                  throw err;
                });
            } else {
              console.log('Waiting for existing refresh token request');
            }

            const newAccessToken = await refreshPromise.current;
            if (newAccessToken) {
              error.config.headers.Authorization = `Bearer ${newAccessToken}`;
              return axios(error.config);
            }
            throw new Error('No new access token after refresh');
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [refreshTokenAction, accessToken]);

  return <>{children}</>;
};
