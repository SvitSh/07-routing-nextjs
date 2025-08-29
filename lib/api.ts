import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

/**
 * Default base URL for the backend API.  Used when no environment
 * variable is provided.  Keeping a sensible fallback ensures that the
 * application can still function locally even if `.env.local` is mis‑configured.
 */
const DEFAULT_API_URL = 'https://notehub-public.goit.study/api';

/**
 * Base URL of the backend API.  Sourced from the `NEXT_PUBLIC_API_URL`
 * environment variable if defined, otherwise falls back to the default.
 */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;

/**
 * Personal access token used for authorising requests to the NoteHub API.
 * Tokens **must** be prefixed with `NEXT_PUBLIC_` in Next.js so that they
 * become available on the client as well as the server.  Do not commit your
 * real token to version control.
 */
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

/**
 * Response shape returned when requesting a paginated list of notes.  The
 * backend returns an array of notes along with the total number of pages
 * available so that pagination controls can be rendered on the client.
 */
export interface FetchNotesResponse {
  /** The notes for the current page */
  notes: Note[];
  /** Total number of pages available */
  totalPages: number;
}

/**
 * Parameters accepted when fetching a page of notes.  Optional fields are
 * omitted when undefined to prevent sending empty strings or null values to
 * the server which would otherwise produce validation errors.
 */
export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
  sortBy?: 'created' | 'updated';
}

/**
 * Fetch a paginated list of notes from the server.  Supports optional
 * filtering by search keyword, tag and sort field.  Only non-empty values
 * are included in the query string.
 */
export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { page, perPage, search, tag, sortBy } = params;
  const query: Record<string, string | number> = { page, perPage };
  if (search && search.trim().length > 0) {
    query.search = search.trim();
  }
  if (tag) {
    query.tag = tag;
  }
  if (sortBy) {
    query.sortBy = sortBy;
  }
  const response = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    params: query,
  });
  return response.data;
};

/**
 * Payload used when creating a new note.  The backend will assign the ID
 * and timestamps for the newly created note.
 */
export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

/**
 * Create a new note on the server.  Returns the newly created note as
 * returned from the API.
 */
export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const response = await axios.post<Note>(`${BASE_URL}/notes`, note, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

/**
 * Delete a note by its identifier.  The API responds with the deleted note
 * which can be used to update client state.
 */
/**
 * Delete a note by its identifier.  The API responds with the full note
 * object that was removed.  Accepting a string here avoids the need to
 * coerce route params into numbers.
 */
export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

/**
 * Fetch a single note by its ID.  Useful for displaying note details on
 * dedicated pages.  Throws an error if the note does not exist.
 */
/**
 * Fetch a single note by its identifier.  Accepts a string ID because
 * route parameters are received as strings.  Throws an error if the
 * note does not exist.
 */
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};