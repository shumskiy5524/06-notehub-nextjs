import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

// Получаем список всех заметок
export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { data } = await axiosInstance.get<FetchNotesResponse>("/", { params });
  return data;
};

// Создаём новую заметку
export const createNote = async (note: NewNote): Promise<Note> => {
  const { data } = await axiosInstance.post<Note>("/", note);
  return data;
};

// Удаляем заметку по id
export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.delete<Note>(`/${id}`);
  return data;
};

// ✅ Новая функция: Получаем одну заметку по id
export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.get<Note>(`/${id}`);
  return data;
};