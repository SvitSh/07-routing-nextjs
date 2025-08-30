import Link from "next/link";
import css from "./SidebarNotes.module.css";
const TAGS = ["All", "Home", "Work", "Study", "Important", "Later"] as const;

export default function SidebarNotesDefault() {
  return (
    <ul className={css.menuList}>
      {TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
