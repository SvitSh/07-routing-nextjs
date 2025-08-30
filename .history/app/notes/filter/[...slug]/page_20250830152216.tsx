import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

const PER_PAGE = 12;


const TAG_LABELS = ["Work", "Personal", "Important", "Later"] as const;

function isNoteTag(v: unknown): v is NoteTag {
  return typeof v === "string" && (TAG_LABELS as readonly string[]).includes(v);
}


export default async function NotesFilterPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  // Тег из URL или "All" по умолчанию
  const tagFromUrl = Array.isArray(slug) && slug.length > 0 ? slug[0] : "All";

  // Для API: undefined = без фильтра
  const tagForQuery: NoteTag | u
