'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaginationNav } from '@/components/ui/pagination-nav';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { NetworkResponse } from '@/lib/types/network-api';

type NetworkListViewProps = {
  networks: NetworkResponse[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  searchTitle: string;
  onSearch: (title: string) => void;
  onPageChange: (page: number) => void;
  onDelete: (networkSeq: number) => Promise<void>;
  onCreate: () => void;
};

export function NetworkListView({
  networks,
  isLoading,
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  searchTitle,
  onSearch,
  onPageChange,
  onDelete,
  onCreate,
}: NetworkListViewProps) {
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchTitle);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Build detail page URL with current search params
  const buildDetailUrl = (networkSeq: number) => {
    const params = new URLSearchParams(searchParams);
    return `/network/${networkSeq}?${params.toString()}`;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(keyword);
  };

  const handleDelete = (networkSeq: number) => {
    setDeleteId(networkSeq);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    await onDelete(deleteId);
    setDeleteId(null);
  };

  // Calculate row number (역순으로 표시)
  const getRowNumber = (index: number) => {
    return totalElements - (currentPage * pageSize) - index;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <section className="space-y-6">
      <div className="space-y-4">
        <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-center">
            <div>
              <Label htmlFor="network-search-keyword" className="sr-only">
                검색어
              </Label>
              <Input
                id="network-search-keyword"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="제목을 입력하세요"
                className="h-10"
              />
            </div>
            <Button type="submit" className="h-10 bg-sky-500 text-white hover:bg-sky-600">
              검색
            </Button>
            <Button type="button" onClick={onCreate} className="h-10 bg-teal-500 text-white hover:bg-teal-600">
              만들기
            </Button>
          </form>
        </section>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-16 text-center">#</TableHead>
                <TableHead>제목</TableHead>
                <TableHead className="w-32 text-center">수정일</TableHead>
                <TableHead className="w-28 text-center">삭제</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    로딩 중...
                  </TableCell>
                </TableRow>
              ) : networks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    조건에 맞는 관계도가 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                networks.map((network, index) => (
                  <TableRow key={network.networkSeq} className="text-sm">
                    <TableCell className="text-center font-semibold text-muted-foreground">
                      {getRowNumber(index)}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={buildDetailUrl(network.networkSeq)}
                        className="text-primary hover:underline"
                      >
                        {network.title}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">
                      {formatDate(network.editDate)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2 text-primary">
                        <button
                          type="button"
                          className="text-destructive transition-colors hover:text-destructive/80 cursor-pointer"
                          onClick={() => handleDelete(network.networkSeq)}
                        >
                          삭제
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center">
          <PaginationNav
            page={currentPage + 1} // PaginationNav uses 1-based indexing
            total={totalElements}
            pageSize={pageSize}
            onPageChange={(page) => onPageChange(page - 1)} // Convert back to 0-based
          />
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        title="관계 삭제"
        description="정말로 이 관계 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </section>
  );
}

