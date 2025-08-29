"use client";

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteList.module.css';
import type { Note } from '@/types/note';
import { deleteNote } from '@/lib/api';

interface NoteListProps {
  notes: Note[];
}

/**
 * Renders a grid of note cards.  Each card displays the note title, a
 * truncated preview of its content, the associated tag and actions to
 * view details or delete the note.  Deleting a note uses a mutation and
 * invalidates the notes list to keep the UI in sync.
 */
export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate: remove } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      // Refresh the notes list after deletion
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  if (!notes.length) return <p>Nothing found.</p>;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <div>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>
              <button
                className={css.button}
                onClick={() => remove(note.id)}
                style={{ marginLeft: '8px' }}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}