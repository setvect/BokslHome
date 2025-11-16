import { getMockNotes, getNoteCategories } from '@/lib/mock/data/note';

import { NoteListView } from './_components/note-list-view';

export const dynamic = 'force-static';

export default function NotePage() {
  const { notes } = getMockNotes();
  const categories = getNoteCategories();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">노트</h1>
      </header>
      <NoteListView notes={notes} categories={categories} />
    </div>
  );
}
