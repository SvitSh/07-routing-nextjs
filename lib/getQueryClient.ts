import { QueryClient } from '@tanstack/react-query';

/**
 * Helper for creating a new QueryClient instance.  This is used on the server
 * during SSR to prefetch data into a fresh cache before hydration on the
 * client.  A new QueryClient should be created for each request to avoid
 * sharing state across users.
 */
export default function getQueryClient() {
  return new QueryClient();
}