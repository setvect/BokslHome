'use client';

import { useEffect, useState } from 'react';

import { apiClient } from '@/lib/api-client';
import type { MemoCategoryResponse, MemoResponse } from '@/lib/types/memo';

import { MemoListView } from './_components/memo-list-view';

// 전체 카테고리를 나타내는 특수 값
const ALL_CATEGORY_SEQ = -1;

export default function MemoPage() {
  const [categories, setCategories] = useState<MemoCategoryResponse[]>([]);
  const [memos, setMemos] = useState<MemoResponse[]>([]);
  const [selectedCategorySeq, setSelectedCategorySeq] = useState<number>(ALL_CATEGORY_SEQ);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 카테고리 목록 조회
  const fetchCategories = async () => {
    try {
      const data = await apiClient.get<MemoCategoryResponse[]>('/api/memo-category');
      setCategories(data);
      return data;
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      throw err;
    }
  };

  // 메모 목록 조회 (전체 또는 카테고리별)
  const fetchMemos = async (categorySeq: number) => {
    try {
      let data: MemoResponse[];
      if (categorySeq === ALL_CATEGORY_SEQ) {
        // 전체 메모 조회
        data = await apiClient.get<MemoResponse[]>('/api/memo');
      } else {
        // 카테고리별 메모 조회
        data = await apiClient.get<MemoResponse[]>(`/api/memo/category/${categorySeq}`);
      }
      setMemos(data);
    } catch (err) {
      console.error('Failed to fetch memos:', err);
      throw err;
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        await fetchCategories();
        // 초기에는 전체 메모 조회
        await fetchMemos(ALL_CATEGORY_SEQ);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // 카테고리 변경 시 메모 목록 조회
  const handleCategoryChange = async (categorySeq: number) => {
    setSelectedCategorySeq(categorySeq);
    try {
      setIsLoading(true);
      await fetchMemos(categorySeq);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '메모를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 메모 삭제 후 새로고침
  const handleMemoDeleted = async () => {
    try {
      // 카테고리 목록도 갱신 (메모 건수 반영)
      await fetchCategories();
      await fetchMemos(selectedCategorySeq);
    } catch (err) {
      setError(err instanceof Error ? err.message : '메모를 불러오는데 실패했습니다.');
    }
  };

  // 카테고리 변경 후 새로고침
  const handleCategoryUpdated = async () => {
    try {
      await fetchCategories();
      await fetchMemos(selectedCategorySeq);
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">메모</h1>
      </header>

      {error ? (
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : (
        <MemoListView
          categories={categories}
          memos={memos}
          selectedCategorySeq={selectedCategorySeq}
          isLoading={isLoading}
          onCategoryChange={handleCategoryChange}
          onMemoDeleted={handleMemoDeleted}
          onCategoryUpdated={handleCategoryUpdated}
        />
      )}
    </div>
  );
}
