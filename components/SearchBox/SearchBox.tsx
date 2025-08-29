"use client";

import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

/**
 * Controlled input used for searching notes.  The `onSearch` callback
 * propagates changes up to the parent component which can then trigger
 * re‑fetching of data.  Debouncing should be applied in the parent to
 * avoid unnecessary requests.
 */
export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}