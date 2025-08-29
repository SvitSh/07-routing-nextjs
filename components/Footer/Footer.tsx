import css from './Footer.module.css';

/**
 * Application footer.  Displays a copyright notice along with developer
 * information and a contact email.  Appears at the bottom of every
 * page via the root layout.
 */
export default function Footer() {
  return (
    <footer className={css.footer}>
      <p>
        © {new Date().getFullYear()} NoteHub. All rights reserved.
      </p>
      <div className={css.wrap}>
        <p>Developer: Your Name</p>
        <p>
          Contact us:{' '}
          <a href="mailto:student@notehub.app">student@notehub.app</a>
        </p>
      </div>
    </footer>
  );
}