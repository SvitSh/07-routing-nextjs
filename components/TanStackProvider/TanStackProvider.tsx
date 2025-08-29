"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface TanStackProviderProps {
  /** React children to be wrapped by the query client provider */
  children: ReactNode;
}

/**
 * Wraps its children in a React Query `QueryClientProvider` using a
 * single `QueryClient` instance.  This provider should be included in
 * the root layout so that all components down the tree can access the
 * client for queries, mutations and cache updates.
 */
export default function TanStackProvider({ children }: TanStackProviderProps) {
  // Lazily create the QueryClient on first render.  Using state prevents
  // re-instantiation on every render which would otherwise reset the cache.
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}