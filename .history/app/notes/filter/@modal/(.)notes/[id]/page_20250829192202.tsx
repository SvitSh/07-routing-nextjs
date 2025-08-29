"use client";

import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
// Reuse the existing styles defined for the full note details page.  The
// relative path climbs four directories to reach the original module.
import css from '../../../../../../notes/[id]/NoteDetails.module.css';

/**
 * Modal preview for a single note.  This component is rendered as an
 * intercepted route inside the `@modal` parallel slot of the
 * `/notes/filter` segment.  It fetches the note details on the client
 * using TanStack Query and displays them in a modal.  Closing the
 * modal triggers `router.back()` to return to the previous page.
 */
export default function NotePreviewModal() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  return (
    <Modal onClose={handleClose}>
      {isLoading && <p>Loading, please wait...</p>}
      {(error || !note) && !isLoading && <p>Something went wrong.</p>}
      {note && !isLoading && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>
              {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
