'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaginationNav } from '@/components/ui/pagination-nav';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { RelationshipRecord } from '@/lib/types/network';

type NetworkListViewProps = {
  records: RelationshipRecord[];
};

export function NetworkListView({ records }: NetworkListViewProps) {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const pageSize = 10;

  const filteredRecords = useMemo(() => {
    const lowered = keyword.trim().toLowerCase();
    return records.filter((record) => {
      if (lowered.length === 0) return true;
      // 제목 또는 설명에서 검색
      return (
        record.title.toLowerCase().includes(lowered) ||
        (record.description ?? '').toLowerCase().includes(lowered)
      );
    });
  }, [keyword, records]);

  const paginatedRecords = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredRecords.slice(startIndex, startIndex + pageSize);
  }, [filteredRecords, page, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
  };

  const handleDelete = (recordId: string) => {
    setDeleteId(recordId);
  };

  const handleConfirmDelete = () => {
    if (!deleteId) return;
    console.log('Deleting record:', deleteId);
    // TODO: Implement actual delete logic here (e.g., API call)
    setDeleteId(null);
  };

  const getRowNumber = (record: RelationshipRecord) => {
    const index = records.findIndex((item) => item.id === record.id);
    return records.length - index;
  };

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-foreground">관계</h1>
      </header>

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
                placeholder="제목 또는 설명을 입력하세요"
                className="h-10"
              />
            </div>
            <Button type="submit" className="h-10 bg-sky-500 text-white hover:bg-sky-600">
              검색
            </Button>
            <Button type="button" className="h-10 bg-teal-500 text-white hover:bg-teal-600">
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
              {paginatedRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    조건에 맞는 관계도가 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRecords.map((record) => (
                  <TableRow key={record.id} className="text-sm">
                    <TableCell className="text-center font-semibold text-muted-foreground">{getRowNumber(record)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <Link href={`/network/${record.id}`} className="text-primary hover:underline">
                          {record.title}
                        </Link>
                        {record.description ? <span className="text-xs text-muted-foreground">{record.description}</span> : null}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">{record.updatedAt}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2 text-primary">
                        <button
                          type="button"
                          className="text-destructive transition-colors hover:text-destructive/80 cursor-pointer"
                          onClick={() => handleDelete(record.id)}
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
          <PaginationNav page={page} total={filteredRecords.length} pageSize={pageSize} onPageChange={setPage} />
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

