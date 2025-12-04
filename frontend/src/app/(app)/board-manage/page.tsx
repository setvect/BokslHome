'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { deleteBoardManager, getBoardManagerPage } from '@/lib/api/board-manage-api-client';
import type { BoardManagerResponse } from '@/lib/types/board-manage-api';

import { BoardManageListView } from './_components/board-manage-list-view';

export default function BoardAdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [boards, setBoards] = useState<BoardManagerResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  // Search state
  const initialSearchField = searchParams.get('searchField') || 'name';
  const initialSearchKeyword = searchParams.get('keyword') || '';
  const [searchField, setSearchField] = useState(initialSearchField);
  const [searchKeyword, setSearchKeyword] = useState(initialSearchKeyword);

  // Fetch boards from API
  const fetchBoards = async (field: string, keyword: string, page: number = 0) => {
    try {
      setIsLoading(true);
      const searchParams: { boardCode?: string; name?: string; page: number; size: number } = {
        page,
        size: pageSize,
      };

      // Add search parameter based on field
      if (keyword) {
        if (field === 'code') {
          searchParams.boardCode = keyword;
        } else {
          searchParams.name = keyword;
        }
      }

      const response = await getBoardManagerPage(searchParams);

      setBoards(response.content);
      setTotalPages(response.page.totalPages);
      setTotalElements(response.page.totalElements);
      setCurrentPage(response.page.number);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch boards:', err);
      setError(err instanceof Error ? err.message : '게시판 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    const pageParam = searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 0;
    fetchBoards(searchField, searchKeyword, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle search
  const handleSearch = (field: string, keyword: string) => {
    setSearchField(field);
    setSearchKeyword(keyword);
    setCurrentPage(0);

    // Update URL
    const params = new URLSearchParams();
    if (keyword) {
      params.set('searchField', field);
      params.set('keyword', keyword);
    }
    params.set('page', '0');
    router.replace(`/board-manage?${params.toString()}`);

    fetchBoards(field, keyword, 0);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    // PaginationNav uses 1-based page numbers, API uses 0-based
    const apiPage = page - 1;
    setCurrentPage(apiPage);

    // Update URL
    const params = new URLSearchParams();
    if (searchKeyword) {
      params.set('searchField', searchField);
      params.set('keyword', searchKeyword);
    }
    params.set('page', apiPage.toString());
    router.replace(`/board-manage?${params.toString()}`);

    fetchBoards(searchField, searchKeyword, apiPage);
  };

  // Handle delete
  const handleDelete = async (boardCode: string) => {
    try {
      await deleteBoardManager(boardCode);
      // Refresh the list
      await fetchBoards(searchField, searchKeyword, currentPage);
    } catch (err) {
      console.error('Failed to delete board:', err);
      setError(err instanceof Error ? err.message : '게시판 삭제에 실패했습니다.');
    }
  };

  // Handle create navigation
  const handleCreate = () => {
    router.push('/board-manage/create');
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">게시판 관리</h1>
      </header>

      {error ? (
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : (
        <BoardManageListView
          boards={boards}
          isLoading={isLoading}
          currentPage={currentPage + 1} // Convert 0-based to 1-based for UI
          totalPages={totalPages}
          totalElements={totalElements}
          pageSize={pageSize}
          searchField={searchField}
          searchKeyword={searchKeyword}
          onSearch={handleSearch}
          onPageChange={handlePageChange}
          onDelete={handleDelete}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
