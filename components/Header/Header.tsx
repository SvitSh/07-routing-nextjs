import Link from 'next/link';
import css from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';

/**
 * Primary navigation component displayed at the top of every page.  Uses
 * Next.js's built in `Link` component to enable client side navigation
 * without full page reloads.  Navigation links are kept simple and
 * accessible.
 */
export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          {/* Replace the static Notes link with a dropdown menu that
              provides quick access to filtered note lists by tag. */}
          <li>
            <TagsMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
}