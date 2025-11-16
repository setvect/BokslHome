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
      <header className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Note Detail</p>
        <h1 className="text-3xl font-semibold text-foreground">{note.title}</h1>
        <p className="text-sm text-muted-foreground">
          분류: {note.category} · 등록일 {note.createdAt} · 수정일 {note.updatedAt}
        </p>
      </header>
      <NoteDetailView note={note} />
    </div>
  );
}

