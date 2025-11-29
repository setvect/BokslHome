'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { apiClient } from '@/lib/api-client';
import type { MemoCategoryResponse, MemoResponse } from '@/lib/types/memo';

import { MemoListView } from './_components/memo-list-view';

// 전체 카테고리를 나타내는 특수 값
const ALL_CATEGORY_SEQ = -1;

export default function MemoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<MemoCategoryResponse[]>([]);
  const [memos, setMemos] = useState<MemoResponse[]>([]);

  // URL에서 초기 카테고리 값 읽기
  const initialCategorySeq = Number(searchParams.get('category'));
  const [selectedCategorySeq, setSelectedCategorySeq] = useState<number>(
    !isNaN(initialCategorySeq) && initialCategorySeq !== 0 ? initialCategorySeq : ALL_CATEGORY_SEQ
  );

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
        // 초기에는 선택된 카테고리(또는 전체) 메모 조회
        await fetchMemos(selectedCategorySeq);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
    // selectedCategorySeq가 변경될 때마다가 아니라, 마운트 시 한 번만 실행하고 싶은데
    // selectedCategorySeq는 URL에서 가져온 초기값으로 설정되므로 의존성 배열에 넣어도 괜찮음 (초기값은 고정)
    // 하지만 fetchMemos를 호출해야 하므로... 
    // 여기서는 초기 로드만 담당하고, URL 변경에 따른 로드는 별도로 처리하거나
    // 단순하게 가기 위해 의존성 배열을 비워둠. 
    // 단, selectedCategorySeq가 URL에서 왔으므로 이걸로 fetchMemos 호출.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 카테고리 변경 시 메모 목록 조회 및 URL 업데이트
  const handleCategoryChange = async (categorySeq: number) => {
    setSelectedCategorySeq(categorySeq);

    // URL 업데이트 (페이지 리로드 없이)
    const newUrl = categorySeq === ALL_CATEGORY_SEQ
      ? '/memo'
      : `/memo?category=${categorySeq}`;
    router.replace(newUrl);

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
