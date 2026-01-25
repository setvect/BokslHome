'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { apiClient } from '@/lib/api-client';
import { getMemoPage } from '@/lib/api/memo-api-client';
import type { MemoCategoryResponse, MemoResponse } from '@/lib/types/memo';

import { MemoListView } from './_components/memo-list-view';

// 전체 카테고리를 나타내는 특수 값
const ALL_CATEGORY_SEQ = -1;
const PAGE_SIZE = 10;

export default function MemoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<MemoCategoryResponse[]>([]);
  const [memos, setMemos] = useState<MemoResponse[]>([]);

  // URL에서 초기값 읽기
  const initialCategorySeq = Number(searchParams.get('category'));
  const initialPage = Number(searchParams.get('page')) || 0;
  const initialWord = searchParams.get('word') || '';

  const [selectedCategorySeq, setSelectedCategorySeq] = useState<number>(
    !isNaN(initialCategorySeq) && initialCategorySeq !== 0 ? initialCategorySeq : ALL_CATEGORY_SEQ
  );
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchWord, setSearchWord] = useState(initialWord);

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

  // 메모 목록 조회 (페이징)
  const fetchMemos = async (categorySeq: number, word: string, page: number) => {
    try {
      const response = await getMemoPage({
        categorySeq: categorySeq === ALL_CATEGORY_SEQ ? undefined : categorySeq,
        word: word || undefined,
        page,
        size: PAGE_SIZE,
      });
      setMemos(response.content);
      setTotalPages(response.page.totalPages);
      setTotalElements(response.page.totalElements);
      setCurrentPage(response.page.number);
    } catch (err) {
      console.error('Failed to fetch memos:', err);
      throw err;
    }
  };

  // URL 업데이트 함수
  const updateUrl = (categorySeq: number, word: string, page: number) => {
    const params = new URLSearchParams();
    if (categorySeq !== ALL_CATEGORY_SEQ) {
      params.set('category', categorySeq.toString());
    }
    if (word) {
      params.set('word', word);
    }
    if (page > 0) {
      params.set('page', page.toString());
    }
    const queryString = params.toString();
    router.replace(`/memo${queryString ? `?${queryString}` : ''}`);
  };

  // 초기 데이터 로드
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        await fetchCategories();
        await fetchMemos(selectedCategorySeq, searchWord, currentPage);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 카테고리 변경 시
  const handleCategoryChange = async (categorySeq: number) => {
    setSelectedCategorySeq(categorySeq);
    setCurrentPage(0);
    updateUrl(categorySeq, searchWord, 0);

    try {
      setIsLoading(true);
      await fetchMemos(categorySeq, searchWord, 0);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '메모를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 검색 시
  const handleSearch = async (word: string) => {
    setSearchWord(word);
    setCurrentPage(0);
    updateUrl(selectedCategorySeq, word, 0);

    try {
      setIsLoading(true);
      await fetchMemos(selectedCategorySeq, word, 0);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '메모를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지 변경 시 (1-based에서 0-based로 변환)
  const handlePageChange = async (page: number) => {
    const apiPage = page - 1;
    setCurrentPage(apiPage);
    updateUrl(selectedCategorySeq, searchWord, apiPage);

    try {
      setIsLoading(true);
      await fetchMemos(selectedCategorySeq, searchWord, apiPage);
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
      await fetchCategories();
      await fetchMemos(selectedCategorySeq, searchWord, currentPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : '메모를 불러오는데 실패했습니다.');
    }
  };

  // 카테고리 변경 후 새로고침
  const handleCategoryUpdated = async () => {
    try {
      await fetchCategories();
      await fetchMemos(selectedCategorySeq, searchWord, currentPage);
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
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>
      ) : (
        <MemoListView
          categories={categories}
          memos={memos}
          selectedCategorySeq={selectedCategorySeq}
          isLoading={isLoading}
          currentPage={currentPage + 1}
          totalPages={totalPages}
          totalElements={totalElements}
          pageSize={PAGE_SIZE}
          searchWord={searchWord}
          onCategoryChange={handleCategoryChange}
          onSearch={handleSearch}
          onPageChange={handlePageChange}
          onMemoDeleted={handleMemoDeleted}
          onCategoryUpdated={handleCategoryUpdated}
        />
      )}
    </div>
  );
}
