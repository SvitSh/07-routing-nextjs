"use client";

import { useState } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

/**
 * List of available tags for filtering notes.  Includes a special
 * 'All' entry which triggers no tag filter when selected.  Update
 * this array if you add new tags to the backend API.
 */
const TAGS = [
  { label: 'All notes', value: 'All' },
  { label: 'Todo', value: 'Todo' },
  { label: 'Work', value: 'Work' },
  { label: 'Personal', value: 'Personal' },
  { label: 'Meeting', value: 'Meeting' },
  { label: 'Shopping', value: 'Shopping' },
];

/**
 * Dropdown menu displayed in the header.  Provides quick access to
 * filtered note lists by tag.  The menu button toggles the
 * visibility of the tag list.  When a tag is selected, the menu
 * automatically closes.
 */
export default function TagsMenu() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <div className={css.menuContainer}>
      <button type="button" className={css.menuButton} onClick={toggleMenu}>
        Notes ▾
      </button>
      {open && (
        <ul className={css.menuList} role="menu">
          {TAGS.map((tag) => (
            <li key={tag.value} className={css.menuItem} role="menuitem">
              <Link
                href={`/notes/filter/${tag.value}`}
                className={css.menuLink}
                onClick={closeMenu}
              >
                {tag.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}