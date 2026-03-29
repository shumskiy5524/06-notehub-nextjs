"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";

export default function NotesClient() {
  const { data, isLoading, error } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes"],
    queryFn: () => fetchNotes({ page: 1, perPage: 20 }), 
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Could not fetch the list of notes. {error.message}</p>;

  return (
    <div>
      {data?.notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.tag}</p>
          <p>{note.content}</p>
          <a href={`/notes/${note.id}`}>View details</a>
        </div>
      ))}
    </div>
  );
}