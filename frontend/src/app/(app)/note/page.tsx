'use client';

import { NoteListView } from './_components/note-list-view';

export default function NotePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">노트</h1>
      </header>
      <NoteListView />
    </div>
  );
}
