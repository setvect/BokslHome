'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

import { apiClient } from '@/lib/api-client';
import type { CodeResponse, PagedResponse } from '@/lib/types/code';
import { CodeMinorListView } from '../_components/code-minor-list-view';

export default function CodeMinorPage() {
  const params = useParams();
  const majorCode = params.majorCode as string;

  const [codes, setCodes] = useState<CodeResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const fetchCodes = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.get<PagedResponse<CodeResponse>>('/api/code/page', {
        params: {
          majorCode,
          page,
          size: pageSize,
          sort: 'orderNo,asc',
        },
      });
      setCodes(data.content);
      setTotalPages(data.page.totalPages);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch codes:', err);
      setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [majorCode, page]);

  useEffect(() => {
    fetchCodes();
  }, [fetchCodes]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1); // API는 0-based, UI는 1-based
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">
          <span className="text-primary">{majorCode}</span> 코드 관리
        </h1>
      </header>

      {error ? (
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>
      ) : (
        <CodeMinorListView
          majorCode={majorCode}
          codes={codes}
          isLoading={isLoading}
          page={page + 1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onRefresh={fetchCodes}
        />
      )}
    </div>
  );
}
