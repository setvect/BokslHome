'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaginationNav } from '@/components/ui/pagination-nav';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { BoardManagerResponse } from '@/lib/types/board-manage-api';
import { cn } from '@/lib/utils';

import { BoardDeleteDialog } from './board-manage-delete-dialog';

const SEARCH_FIELDS = [
  { label: '이름', value: 'name' },
  { label: '코드', value: 'code' },
];

interface BoardManageListViewProps {
  boards: BoardManagerResponse[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  searchField: string;
  searchKeyword: string;
  onSearch: (field: string, keyword: string) => void;
  onPageChange: (page: number) => void;
  onDelete: (boardCode: string) => void;
  onCreate: () => void;
}

export function BoardManageListView({
  boards,
  isLoading,
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  searchField,
  searchKeyword,
  onSearch,
  onPageChange,
  onDelete,
  onCreate,
}: BoardManageListViewProps) {
  const [localSearchField, setLocalSearchField] = useState(searchField);
  const [localSearchKeyword, setLocalSearchKeyword] = useState(searchKeyword);

  const handleSearchClick = () => {
    onSearch(localSearchField, localSearchKeyword);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid w-full gap-4 sm:grid-cols-[150px_minmax(220px,1fr)_auto] sm:items-end">
            <div className="flex flex-col gap-0">
              <Label htmlFor="board-search-field" className="sr-only">
                검색 항목
              </Label>
              <Select value={localSearchField} onValueChange={setLocalSearchField}>
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
              <Input
                id="board-search-input"
                placeholder="검색어"
                className="h-10"
                value={localSearchKeyword}
                onChange={(e) => setLocalSearchKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button type="button" className="h-10 px-6 sm:self-end" onClick={handleSearchClick}>
              검색
            </Button>
          </div>
          <Button type="button" variant="secondary" className="h-10 px-6 sm:w-auto lg:self-end" onClick={onCreate}>
            만들기
          </Button>
        </div>
      </section>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-32 text-center">코드</TableHead>
              <TableHead className="w-32 text-center">바로가기</TableHead>
              <TableHead>게시판 이름</TableHead>
              <TableHead className="w-40 text-center">기능</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  로딩 중...
                </TableCell>
              </TableRow>
            ) : boards.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  게시판이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              boards.map((board) => {
                // Build query params to preserve list state
                const queryParams = new URLSearchParams();
                if (searchKeyword) {
                  queryParams.set('searchField', searchField);
                  queryParams.set('keyword', searchKeyword);
                }
                queryParams.set('page', (currentPage - 1).toString());
                const queryString = queryParams.toString();

                const detailPath = `/board-manage/${board.boardCode}${queryString ? `?${queryString}` : ''}`;
                const editPath = `/board-manage/${board.boardCode}/edit${queryString ? `?${queryString}` : ''}`;
                const boardPath = `/board/${board.boardCode}`; // 게시판 모듈로 이동

                return (
                  <TableRow key={board.boardCode} className="transition-colors hover:bg-muted/60 dark:hover:bg-muted/30">
                    <TableCell className="text-center text-sm font-medium">
                      <Link href={detailPath} className="text-primary hover:underline">
                        {board.boardCode}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      <Link href={boardPath} className="text-primary hover:underline">
                        바로가기
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm">{board.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Link href={editPath} className="text-primary hover:underline">
                          수정
                        </Link>
                        <span className="text-muted-foreground/40">|</span>
                        <BoardDeleteDialog
                          boardCode={board.boardCode}
                          boardName={board.name}
                          onDelete={() => onDelete(board.boardCode)}
                          trigger={
                            <button type="button" className={cn('text-destructive transition-colors hover:text-destructive/80')}>
                              삭제
                            </button>
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center">
        <PaginationNav page={currentPage} total={totalElements} pageSize={pageSize} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
