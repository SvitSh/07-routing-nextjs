"use client";

interface NoteErrorProps {
  error: Error & { digest?: string };
  reset?: () => void;
}

/**
 * Error boundary for the note details page.  Displays a message
 * describing the problem encountered when fetching an individual note.
 */
export default function NoteError({ error }: NoteErrorProps) {
  return <p>Could not fetch note details. {error.message}</p>;
}