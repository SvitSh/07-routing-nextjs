import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

const PER_PAGE = 12;

// Разрешённые теги (должны совпадать с union в NoteTag)
const VALID_TAGS: readonly NoteTag[] = [
  "Work",
  "Personal",
  "Important",
  "Later",
] as const;

function isNoteTag(v: unknown): v is NoteTag {
  return typeof v === "string" && (VALID_TAGS as readonly string[]).includes(v);
}

/**
 * SSR-страница фильтрации заметок по тегу через catch-all [...slug].
 * params здесь — Promise, поэтому делаем await, прежде чем доставать slug.
 */
export default async function NotesFilterPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  // Тег из URL или "All" по умолчанию
  const tagFromUrl = Array.isArray(slug) && slug.length > 0 ? slug[0] : "All";

  //
