'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaginationNav } from '@/components/ui/pagination-nav';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { BoardCategory, BoardListMock, BoardPostMock } from '@/lib/types/board';

const SEARCH_FIELDS = [
  { label: '제목', value: 'title' },
  { label: '내용', value: 'content' },
];

type BoardListViewProps = {
  category: BoardCategory;
  list: BoardListMock;
};

export function BoardListView({ category, list }: BoardListViewProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * list.pageSize;
    return (list.posts ?? []).slice(startIndex, startIndex + list.pageSize);
  }, [currentPage, list.pageSize, list.posts]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">{category.name}</h1>
      </header>
      <section className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-sm transition-colors">
        <BoardListFilterBar category={category} />
        <BoardTable
          category={category}
          posts={paginatedPosts as BoardPostMock[]}
          page={currentPage}
          pageSize={list.pageSize}
          totalCount={list.totalCount}
        />
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <PaginationNav page={currentPage} total={list.totalCount} pageSize={list.pageSize} onPageChange={handlePageChange} />
        </div>
      </section>
    </div>
  );
}

function BoardListFilterBar({ category }: { category: BoardCategory }) {
  const [field, setField] = useState(SEARCH_FIELDS[0].value);
  const [keyword, setKeyword] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // UI 전용 목업이므로 검색은 나중에 백엔드 연동 시 구현한다.
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <form onSubmit={handleSubmit} className="grid w-full gap-4 sm:grid-cols-[150px_minmax(220px,1fr)_auto] sm:items-end">
        <div className="flex flex-col gap-0">
          <Label htmlFor="board-search-field" className="sr-only">
            검색 항목
          </Label>
          <Select value={field} onValueChange={setField}>
            <SelectTrigger id="board-search-field" className="h-10 w-full">
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
        <div className="flex flex-col gap-0">
          <Label htmlFor="board-search-input" className="sr-only">
            검색어
          </Label>
          <Input
            id="board-search-input"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="검색어"
            className="h-10"
          />
        </div>
        <Button type="submit" className="h-10 px-6 sm:self-end">
          검색
        </Button>
      </form>

      <Button asChild variant="secondary" className="h-10 px-6 sm:w-auto lg:self-end">
        <Link href={`/board/${category.code}/write`}>만들기</Link>
      </Button>
    </div>
  );
}

type BoardTableProps = {
  category: BoardCategory;
  posts: BoardPostMock[];
  page: number;
  pageSize: number;
  totalCount: number;
};

function BoardTable({ category, posts, page, pageSize, totalCount }: BoardTableProps) {
  if (totalCount === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
        게시글이 없습니다.
      </div>
    );
  }

  const startNumber = totalCount - (page - 1) * pageSize;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16 text-center">#</TableHead>
            <TableHead>제목</TableHead>
            <TableHead className="w-40 text-center">날짜</TableHead>
            <TableHead className="w-32 text-center">기능</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post, index) => {
            const number = startNumber - index;
            const detailHref = `/board/${category.code}/${post.id}`;
            return (
              <TableRow key={post.id} className="transition-colors hover:bg-muted/60 dark:hover:bg-muted/30">
                <TableCell className="text-center text-sm text-muted-foreground">{number}</TableCell>
                <TableCell>
                  <Link href={detailHref} className="flex items-center gap-2 text-primary hover:underline">
                    <span>{post.title}</span>
                    {post.isEncrypted ? (
                      <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">암호화</span>
                    ) : null}
                  </Link>
                </TableCell>
                <TableCell className="text-center text-sm text-muted-foreground">{post.createdAt}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Link href={`${detailHref}/edit`} className="text-primary hover:underline">
                      수정
                    </Link>
                    <span className="text-muted-foreground/40">|</span>
                    <button type="button" className={cn('text-destructive transition-colors hover:text-destructive/80')}>
                      삭제
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
