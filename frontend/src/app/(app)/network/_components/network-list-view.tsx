'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaginationNav } from '@/components/ui/pagination-nav';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { RelationshipRecord } from '@/lib/types/network';

const SEARCH_FIELDS = [
  { label: '제목', value: 'title' },
  { label: '설명', value: 'description' },
];

type NetworkListViewProps = {
  records: RelationshipRecord[];
};

export function NetworkListView({ records }: NetworkListViewProps) {
  const [field, setField] = useState(SEARCH_FIELDS[0].value);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filteredRecords = useMemo(() => {
    const lowered = keyword.trim().toLowerCase();
    return records.filter((record) => {
      if (lowered.length === 0) return true;
      const target = field === 'description' ? record.description ?? '' : record.title;
      return target.toLowerCase().includes(lowered);
    });
  }, [field, keyword, records]);

  const paginatedRecords = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredRecords.slice(startIndex, startIndex + pageSize);
  }, [filteredRecords, page, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
  };

  const getRowNumber = (record: RelationshipRecord) => {
    const index = records.findIndex((item) => item.id === record.id);
    return records.length - index;
  };

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-foreground">관계</h1>
        <p className="text-muted-foreground">운영 중 관계도 목록을 게시판 형태로 조회할 수 있습니다.</p>
      </header>

      <div className="space-y-4">
        <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[150px_minmax(220px,1fr)_auto_auto] sm:items-end">
            <div className="flex flex-col gap-1">
              <Label htmlFor="network-search-field" className="text-sm font-medium text-muted-foreground">
                구분
              </Label>
              <Select value={field} onValueChange={setField}>
                <SelectTrigger id="network-search-field" className="h-10">
                  <SelectValue placeholder="검색 항목" />
                </SelectTrigger>
                <SelectContent>
                  {SEARCH_FIELDS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="network-search-keyword" className="text-sm font-medium text-muted-foreground">
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
                <TableHead className="w-28 text-center">기능</TableHead>
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
                        <Link href={`/network/${record.id}`} className="hover:underline">
                          수정
                        </Link>
                        <span className="text-muted-foreground/40">|</span>
                        <button type="button" className="text-destructive transition-colors hover:text-destructive/80">
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
    </section>
  );
}

