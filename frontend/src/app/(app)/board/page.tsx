'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getBoardArticlePage } from '@/lib/api/board-article-api-client';
import { getBoardManager } from '@/lib/api/board-manage-api-client';
import { DEFAULT_BOARD_CODE } from '@/lib/constants/board';
import type { BoardArticleResponse, SearchType } from '@/lib/types/board-article-api';
import type { BoardManagerResponse } from '@/lib/types/board-manage-api';

import { BoardListView } from './_components/board-list-view';

export default function BoardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = DEFAULT_BOARD_CODE;
  const [boardSettings, setBoardSettings] = useState<BoardManagerResponse | null>(null);
  const [articles, setArticles] = useState<BoardArticleResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  // Search state
  const initialSearchType = (searchParams.get('searchType') as SearchType) || 'TITLE';
  const initialSearchWord = searchParams.get('word') || '';
  const [searchType, setSearchType] = useState<SearchType>(initialSearchType);
  const [searchWord, setSearchWord] = useState(initialSearchWord);

  // Fetch board settings
  useEffect(() => {
    const fetchBoardSettings = async () => {
      try {
        const settings = await getBoardManager(code);
        setBoardSettings(settings);
      } catch (err) {
        console.error('Failed to fetch board settings:', err);
        setError(err instanceof Error ? err.message : '게시판 설정을 불러오는데 실패했습니다.');
      }
    };

    fetchBoardSettings();
  }, [code]);

  // Fetch articles from API
  const fetchArticles = async (type: SearchType, word: string, page: number = 0) => {
    try {
      setIsLoading(true);
      const response = await getBoardArticlePage({
        boardCode: code,
        searchType: word ? type : undefined,
        word: word || undefined,
        page,
        size: pageSize,
      });

      setArticles(response.content);
      setTotalPages(response.page.totalPages);
      setTotalElements(response.page.totalElements);
      setCurrentPage(response.page.number);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
      setError(err instanceof Error ? err.message : '게시글 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    const pageParam = searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 0;
    fetchArticles(searchType, searchWord, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle search
  const handleSearch = (type: SearchType, word: string) => {
    setSearchType(type);
    setSearchWord(word);
    setCurrentPage(0);

    // Update URL
    const params = new URLSearchParams();
    if (word) {
      params.set('searchType', type);
      params.set('word', word);
    }
    params.set('page', '0');
    router.replace(`/board?${params.toString()}`);

    fetchArticles(type, word, 0);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    // PaginationNav uses 1-based page numbers, API uses 0-based
    const apiPage = page - 1;
    setCurrentPage(apiPage);

    // Update URL
    const params = new URLSearchParams();
    if (searchWord) {
      params.set('searchType', searchType);
      params.set('word', searchWord);
    }
    params.set('page', apiPage.toString());
    router.replace(`/board?${params.toString()}`);

    fetchArticles(searchType, searchWord, apiPage);
  };

  // Handle delete
  const handleDelete = async (boardArticleSeq: number) => {
    const { deleteBoardArticle } = await import('@/lib/api/board-article-api-client');
    try {
      await deleteBoardArticle(boardArticleSeq);
      // Refresh the list
      await fetchArticles(searchType, searchWord, currentPage);
    } catch (err) {
      console.error('Failed to delete article:', err);
      setError(err instanceof Error ? err.message : '게시글 삭제에 실패했습니다.');
    }
  };

  if (!boardSettings) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-foreground">게시판</h1>
        </header>
        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
          로딩 중...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">{boardSettings.name}</h1>
      </header>

      {error ? (
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : (
        <BoardListView
          category={boardSettings}
          articles={articles}
          isLoading={isLoading}
          currentPage={currentPage + 1} // Convert 0-based to 1-based for UI
          totalPages={totalPages}
          totalElements={totalElements}
          pageSize={pageSize}
          searchType={searchType}
          searchWord={searchWord}
          onSearch={handleSearch}
          onPageChange={handlePageChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
