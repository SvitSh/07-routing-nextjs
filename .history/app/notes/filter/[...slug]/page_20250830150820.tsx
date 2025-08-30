import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

const PER_PAGE = 12;

/**
 * SSR-сторінка фільтрації нотаток за тегом через catch-all [...slug].
 * params тут — Promise, тому очікуємо (await) перш ніж діставати slug.
 */
export default async function NotesFilterPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  // Тег з URL або "All" за замовчуванням
  const tagFromUrl = Array.isArray(slug) && slug.length > 0 ? slug[0] : "All";

  // Для бекенда "All" = без фільтра, тому НЕ передаємо tag
  const effectiveTag = tagFromUrl === "All" ? undefined : tagFromUrl;

  const queryClient = getQueryClient();

  // Ключ синхронізуємо з клієнтом: ["notes", page, perPage, search, tagLabel]
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, PER_PAGE, "", tagFromUrl],
    queryFn: () =>
      fetchNotes({ page: 1, perPage: PER_PAGE, search: "", tag: effectiveTag }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tagFromUrl} />
    </HydrationBoundary>
  );
}
