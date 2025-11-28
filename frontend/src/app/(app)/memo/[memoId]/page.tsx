'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

import { apiClient } from '@/lib/api-client';
import type { MemoCategoryResponse, MemoResponse } from '@/lib/types/memo';

import { MemoEditor } from '../_components/memo-editor';

// 동적 라우트 페이지
export default function MemoDetailPage() {
  const params = useParams();
  const memoId = params.memoId as string;

  const [memo, setMemo] = useState<MemoResponse | null>(null);
  const [categories, setCategories] = useState<MemoCategoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [memoData, categoriesData] = await Promise.all([
          apiClient.get<MemoResponse>(`/api/memo/${memoId}`),
          apiClient.get<MemoCategoryResponse[]>('/api/memo-category'),
        ]);
        setMemo(memoData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (memoId) {
      fetchData();
    }
  }, [memoId]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !memo) {
    return (
      <div className="space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold text-foreground">메모</h1>
        </header>
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error || '메모를 찾을 수 없습니다.'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-foreground">메모</h1>
      </header>
      <MemoEditor memo={memo} categories={categories} mode="edit" />
    </div>
  );
}
