'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

import { getNote } from '@/lib/api/note-api-client';
import type { NoteResponse } from '@/lib/types/note-api';

import { NoteDetailView } from '../_components/note-detail-view';

interface NoteDetailPageProps {
  params: Promise<{
    noteId: string;
  }>;
}

export default function NoteDetailPage({ params }: NoteDetailPageProps) {
  const [noteId, setNoteId] = useState<number | null>(null);
  const [note, setNote] = useState<NoteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadParams = async () => {
      const { noteId: noteIdStr } = await params;
      setNoteId(Number(noteIdStr));
    };
    loadParams();
  }, [params]);

  useEffect(() => {
    if (noteId === null) return;

    const fetchNote = async () => {
      try {
        setLoading(true);
        const data = await getNote(noteId);
        setNote(data);
      } catch (err) {
        console.error('Failed to fetch note:', err);
        setError('노트를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-foreground">노트</h1>
        </header>
        <div className="flex h-64 items-center justify-center rounded-2xl border border-border bg-card">
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error || !note) {
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

