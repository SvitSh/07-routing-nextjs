import css from './NotesFilterLayout.module.css';

/**
 * Layout for the `/notes/filter` segment.  Declares two parallel slots
 * (`@sidebar` and `@modal`) which render alongside the main content
 * (children).  The sidebar displays tag filter links, while the modal
 * slot is used for route interception to show note previews.  When no
 * modal route is active, the `@modal` slot renders nothing.
 */
export default function NotesFilterLayout({
  children,
  sidebar,
  modal,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className={css.wrapper}>
      {/* Render the modal above all content so that it overlays
          the page when present. */}
      {modal}
      <div className={css.contentArea}>
        <aside className={css.sidebar}>{sidebar}</aside>
        <main className={css.main}>{children}</main>
      </div>
    </div>
  );
}