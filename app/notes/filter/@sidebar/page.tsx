import Link from 'next/link';
import css from './SidebarNotes.module.css';

/**
 * Sidebar menu displayed on the left side of the notes filter page.  Lists
 * all available tags as links which navigate to the corresponding
 * filtered notes route.  Includes an entry for viewing all notes.
 */
export default function SidebarNotes() {
  const tags = [
    { label: 'All notes', value: 'All' },
    { label: 'Todo', value: 'Todo' },
    { label: 'Work', value: 'Work' },
    { label: 'Personal', value: 'Personal' },
    { label: 'Meeting', value: 'Meeting' },
    { label: 'Shopping', value: 'Shopping' },
  ];
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag.value} className={css.menuItem}>
          <Link href={`/notes/filter/${tag.value}`} className={css.menuLink}>
            {tag.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}