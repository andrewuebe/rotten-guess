'use client'

import { useState } from 'react';
import { AuthProvider } from '../../app/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClientOptions } from '@/utilities/constants/ReactQuery';
import { SocketProvider } from '@/app/contexts/SocketContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          {children}
        </SocketProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
