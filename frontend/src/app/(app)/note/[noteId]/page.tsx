'use client';

import { useEffect, useState } from 'react';
import { notFound, useSearchParams } from 'next/navigation';

import { getNote } from '@/lib/api/note-api-client';
import type { NoteResponse } from '@/lib/types/note-api';

import { NoteDetailView } from '../_components/note-detail-view';

interface NoteDetailPageProps {
  params: Promise<{
    noteId: string;
  }>;
}

export default function NoteDetailPage({ params }: NoteDetailPageProps) {
  const searchParams = useSearchParams();
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
    if (noteId === null) {
      return;
    }

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

  // 검색 조건을 포함한 목록 URL 생성
  const getListUrl = () => {
    const params = new URLSearchParams();
    const category = searchParams.get('category');
    const field = searchParams.get('field');
    const keyword = searchParams.get('keyword');
    const page = searchParams.get('page');

    if (category) {
      params.set('category', category);
    }
    if (field) {
      params.set('field', field);
    }
    if (keyword) {
      params.set('keyword', keyword);
    }
    if (page) {
      params.set('page', page);
    }

    const queryString = params.toString();
    return `/note${queryString ? `?${queryString}` : ''}`;
  };

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
      <NoteDetailView note={note} listUrl={getListUrl()} />
    </div>
  );
}
