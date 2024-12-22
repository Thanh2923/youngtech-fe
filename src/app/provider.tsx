'use client';

import { Provider } from 'react-redux';
import { persistor, store } from '@/redux/Store';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { useMemo } from 'react';

type ReduxProviderProps = {
  pageProps?: { session?: any }; // Dữ liệu session từ NextAuth
  children: React.ReactNode;
};

export default function ReduxProvider({ pageProps, children }: ReduxProviderProps) {
  const session = pageProps?.session || null;

  // Tạo QueryClient để sử dụng React Query
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
              {children}
          </QueryClientProvider>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}


