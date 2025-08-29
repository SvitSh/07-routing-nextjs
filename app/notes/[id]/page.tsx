import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/lib/getQueryClient';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface NoteDetailsPageProps {
  params: { id: string };
}

/**
 * Server component for the dynamic note details route.  Prefetches the
 * requested note on the server and hydrates the cache on the client so
 * that the NoteDetailsClient component can render immediately without a
 * network request.
 */
export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const queryClient = getQueryClient();
  const id = params.id;
  // Prefetch the note if an ID is provided.  Even though IDs are
  // strings, the API will coerce them as needed.  Skipping prefetch
  // when id is falsy prevents unnecessary network calls.
  if (id) {
    await queryClient.prefetchQuery({
      queryKey: ['note', id],
      queryFn: () => fetchNoteById(id),
    });
  }
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}