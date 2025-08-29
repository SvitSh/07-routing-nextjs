import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/lib/getQueryClient';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { NoteTag } from '@/types/note';

const PER_PAGE = 12;

/**
 * Server component for the catch‑all filtered notes route.  Extracts
 * the tag from the dynamic `slug` parameter and prefetches the first
 * page of notes using TanStack Query.  The prefetched data is
 * dehydrated and passed to the client component for hydration.  If
 * no tag is provided or the tag is 'All', all notes are fetched.
 */
export default async function NotesFilterPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const slug = params.slug;
  // Determine the tag from the first segment of the slug.  If the
  // slug is undefined or the first segment is 'All', no tag filter is
  // applied (undefined will be omitted from the query string).
  let tag: NoteTag | undefined;
  if (slug && slug.length > 0 && slug[0] !== 'All') {
    tag = slug[0] as NoteTag;
  }
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, PER_PAGE, '', tag],
    queryFn: () => fetchNotes({ page: 1, perPage: PER_PAGE, tag }),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}