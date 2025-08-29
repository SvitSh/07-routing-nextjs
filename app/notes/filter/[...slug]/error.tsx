"use client";

interface NotesFilterErrorProps {
  error: Error & { digest?: string };
  reset?: () => void;
}

/**
 * Error boundary for the `/notes/filter` catch‑all route.  Displays a
 * human friendly message when the filtered list of notes cannot be
 * retrieved from the server.  The underlying error message is also
 * displayed to aid debugging.
 */
export default function NotesFilterError({ error }: NotesFilterErrorProps) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}