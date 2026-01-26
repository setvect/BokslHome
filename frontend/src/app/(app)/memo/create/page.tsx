'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

import { apiClient } from '@/lib/api-client';
import type { MemoCategoryResponse } from '@/lib/types/memo';

import { MemoEditor } from '../_components/memo-editor';

export default function MemoCreatePage() {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<MemoCategoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // URL에서 카테고리 파라미터 읽기
  const categoryParam = searchParams.get('category');
  const defaultCategorySeq = categoryParam ? Number(categoryParam) : undefined;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await apiClient.get<MemoCategoryResponse[]>('/api/memo-category');
        setCategories(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError(err instanceof Error ? err.message : '카테고리를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold text-foreground">메모 작성</h1>
        </header>
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-foreground">메모 작성</h1>
        <p className="text-sm text-muted-foreground">간단한 링크나 기억하고 싶은 문장을 적어 두세요.</p>
      </header>
      <MemoEditor categories={categories} mode="create" defaultCategorySeq={defaultCategorySeq} />
    </div>
  );
}
