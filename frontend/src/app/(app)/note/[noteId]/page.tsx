import { notFound } from 'next/navigation';

import { NOTE_DOCUMENTS, getMockNote } from '@/lib/mock/data/note';

import { NoteDetailView } from '../_components/note-detail-view';

interface NoteDetailPageProps {
  params: {
    noteId: string;
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return NOTE_DOCUMENTS.map((note) => ({ noteId: String(note.id) }));
}

export default function NoteDetailPage({ params }: NoteDetailPageProps) {
  const noteId = Number(params.noteId);
  const note = getMockNote(noteId);

  if (!note) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">노트</h1>
      </header>
      <NoteDetailView note={note} />
    </div>
  );
}

