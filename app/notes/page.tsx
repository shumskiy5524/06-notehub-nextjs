"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse, FetchNotesParams } from "@/lib/api";

export default function NotesClient() {
  
  const params: FetchNotesParams = { page: 1, perPage: 20 };

  const { data, isLoading, error } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", params.page, params.perPage], 
    queryFn: () => fetchNotes(params), 
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