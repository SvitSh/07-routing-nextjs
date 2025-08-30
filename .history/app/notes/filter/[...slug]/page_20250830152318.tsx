import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

const PER_PAGE = 12;

/** Метки, которые можем получить в URL/меню. */
const TAG_LABELS = ["Work", "Personal", "Important", "Later"] as const;

function isNoteTag(v: unknown): v is NoteTag {
  return typeof v === "string" && (TAG_LABELS as readonly string[]).includes(v);
}

/**
 * SSR-страница фильтрации заметок по тегу через catch-all [...slug].
 * params здесь — Promise, поэтому делаем await перед использованием.
 */
export default async function NotesFilterPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  // Тег из URL или "All" по умолчанию
  const tagFromUrl = Array.isArray(slug) && slug.length > 0 ? slug[0] : "All";

  // Для API: undefined = без фильтра
  const tagForQuery: NoteTag | undefined =
    tagFromUrl === "All"
      ? undefined
      : isNoteTag(tagFromUrl)
      ? tagFromUrl
      : undefined;

  const queryClient = getQueryClient();

  // Ключ синхронен с клиентом: ["notes", page, perPage, search, tagLabel]
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, PER_PAGE, "", tagFromUrl],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: PER_PAGE,
        search: "",
        tag: tagForQuery,
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  // Для клиента отдаём "All" или валидный NoteTag
  const tagForClient: NoteTag | "All" =
    tagFromUrl === "All" ? "All" : isNoteTag(tagFromUrl) ? tagFromUrl : "All";

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tagForClient} />
    </HydrationBoundary>
  );
}
