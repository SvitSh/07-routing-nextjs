"use client";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset?: () => void;
}

/**
 * Catch-all error boundary for unexpected errors in the application.  A more
 * specific error page is provided for the `/notes` routes but this will
 * capture anything else that bubbles up.
 */
export default function GlobalError({ error }: GlobalErrorProps) {
  return <p>Something went wrong: {error.message}</p>;
}