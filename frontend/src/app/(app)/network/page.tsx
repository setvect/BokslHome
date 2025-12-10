'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { deleteNetwork, getNetworkPage } from '@/lib/api/network-api-client';
import type { NetworkResponse } from '@/lib/types/network-api';

import { NetworkListView } from './_components/network-list-view';

export default function NetworkPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [networks, setNetworks] = useState<NetworkResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  // Search state
  const initialTitle = searchParams.get('title') || '';
  const [searchTitle, setSearchTitle] = useState(initialTitle);

  // Fetch networks from API
  const fetchNetworks = async (title?: string, page: number = 0) => {
    try {
      setIsLoading(true);
      const response = await getNetworkPage({
        title: title || undefined,
        page,
        size: pageSize,
      });

      setNetworks(response.content);
      setTotalElements(response.page.totalElements);
      setCurrentPage(response.page.number);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch networks:', err);
      setError(err instanceof Error ? err.message : '네트워크 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    const pageParam = searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 0;
    fetchNetworks(searchTitle, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle search
  const handleSearch = (title: string) => {
    setSearchTitle(title);
    setCurrentPage(0);

    // Update URL
    const params = new URLSearchParams();
    if (title) params.set('title', title);
    params.set('page', '0');
    router.replace(`/network?${params.toString()}`);

    fetchNetworks(title, 0);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Update URL
    const params = new URLSearchParams();
    if (searchTitle) params.set('title', searchTitle);
    params.set('page', page.toString());
    router.replace(`/network?${params.toString()}`);

    fetchNetworks(searchTitle, page);
  };

  // Handle delete
  const handleDelete = async (networkSeq: number) => {
    try {
      await deleteNetwork(networkSeq);
      // Refresh the list
      await fetchNetworks(searchTitle, currentPage);
    } catch (err) {
      console.error('Failed to delete network:', err);
      setError(err instanceof Error ? err.message : '네트워크 삭제에 실패했습니다.');
    }
  };

  // Handle create navigation
  const handleCreate = () => {
    router.push('/network/create');
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">관계</h1>
      </header>

      {error ? (
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : (
        <NetworkListView
          networks={networks}
          isLoading={isLoading}
          currentPage={currentPage}
          totalElements={totalElements}
          pageSize={pageSize}
          searchTitle={searchTitle}
          onSearch={handleSearch}
          onPageChange={handlePageChange}
          onDelete={handleDelete}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
