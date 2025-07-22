'use client';

import { Provider } from 'react-redux';
import { persistor, store } from '@/redux/store';
import { AuthInterceptorProvider } from '@/components/AuthInterceptorProvider';
import { PersistGate } from 'redux-persist/integration/react';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <AuthInterceptorProvider>{children}</AuthInterceptorProvider>
      </PersistGate>
    </Provider>
  );
}
