'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaginationNav } from '@/components/ui/pagination-nav';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import type { BoardManageSummary } from '../_data/board-list';
import { BoardDeleteDialog } from './board-delete-dialog';

const SEARCH_FIELDS = [
  { label: '이름', value: 'name' },
  { label: '코드', value: 'code' },
];

interface BoardManageListViewProps {
  boards: BoardManageSummary[];
}

export function BoardManageListView({ boards }: BoardManageListViewProps) {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalCount = boards.length;

  const paginatedBoards = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return boards.slice(startIndex, startIndex + pageSize);
  }, [boards, page, pageSize]);

  return (
    <>
      <section className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-sm transition-colors">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid w-full gap-4 sm:grid-cols-[150px_minmax(220px,1fr)_auto] sm:items-end">
            <div className="flex flex-col gap-0">
              <Label htmlFor="board-search-field" className="sr-only">
                검색 항목
              </Label>
              <Select defaultValue={SEARCH_FIELDS[0].value}>
                <SelectTrigger id="board-search-field" className="h-10 w-full">
                  <SelectValue placeholder="검색 항목" />
                </SelectTrigger>
                <SelectContent>
                  {SEARCH_FIELDS.map((field) => (
                    <SelectItem key={field.value} value={field.value}>
                      {field.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-0">
              <Label htmlFor="board-search-input" className="sr-only">
                검색어
              </Label>
              <Input id="board-search-input" placeholder="검색어" className="h-10" />
            </div>
            <Button type="button" className="h-10 px-6 sm:self-end">
              검색
            </Button>
          </div>
          <Button type="button" variant="secondary" className="h-10 px-6 sm:w-auto lg:self-end" asChild>
            <Link href="/board-manage/create">만들기</Link>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[140px]">코드</TableHead>
                <TableHead className="min-w-[120px]">바로가기</TableHead>
                <TableHead>게시판 이름</TableHead>
                <TableHead className="min-w-[160px] text-right">기능</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBoards.map((board) => {
                const detailPath = `/board-manage/${board.code}`;
                return (
                  <TableRow key={board.code}>
                    <TableCell className="font-medium">
                      <Link href={detailPath} className="text-primary hover:underline">
                        {board.code}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button variant="link" className="h-auto px-0" asChild>
                        <Link href={detailPath}>바로가기</Link>
                      </Button>
                    </TableCell>
                    <TableCell>{board.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="link" className="h-auto px-0" asChild>
                          <Link href={`/board-manage/${board.code}/edit`}>수정</Link>
                        </Button>
                        <BoardDeleteDialog
                          boardName={board.name}
                          trigger={
                            <Button variant="link" className="h-auto px-0 text-destructive">
                              삭제
                            </Button>
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <PaginationNav page={page} total={totalCount} pageSize={pageSize} onPageChange={setPage} />
        </div>
      </section>
    </>
  );
}
