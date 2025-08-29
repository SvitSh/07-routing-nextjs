/**
 * Loading state for the `/notes/filter` catch‑all route.  Displays a
 * message while server components or data are being fetched.  Ensures
 * that users receive feedback instead of staring at a blank page.
 */
export default function NotesFilterLoading() {
  return <p>Loading, please wait...</p>;
}