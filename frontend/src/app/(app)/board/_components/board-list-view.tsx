'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Paperclip } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaginationNav } from '@/components/ui/pagination-nav';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { BoardArticleResponse, SearchType } from '@/lib/types/board-article-api';
import type { BoardManagerResponse } from '@/lib/types/board-manage-api';

const SEARCH_FIELDS: { label: string; value: SearchType }[] = [
  { label: '제목', value: 'TITLE' },
  { label: '내용', value: 'CONTENT' },
];

type BoardListViewProps = {
  category: BoardManagerResponse;
  articles: BoardArticleResponse[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  searchType: SearchType;
  searchWord: string;
  onSearch: (type: SearchType, word: string) => void;
  onPageChange: (page: number) => void;
  onDelete: (boardArticleSeq: number) => Promise<void>;
};

export function BoardListView({
  category,
  articles,
  isLoading,
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  searchType,
  searchWord,
  onSearch,
  onPageChange,
  onDelete,
}: BoardListViewProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <BoardListFilterBar
            category={category}
            searchType={searchType}
            searchWord={searchWord}
            onSearch={onSearch}
          />
        </section>
        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
          로딩 중...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <BoardListFilterBar
          category={category}
          searchType={searchType}
          searchWord={searchWord}
          onSearch={onSearch}
        />
      </section>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <BoardTable
          category={category}
          articles={articles}
          page={currentPage}
          pageSize={pageSize}
          totalCount={totalElements}
          onDelete={onDelete}
        />
      </div>

      {totalPages > 0 && (
        <div className="flex justify-center">
          <PaginationNav page={currentPage} total={totalElements} pageSize={pageSize} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
}

type BoardListFilterBarProps = {
  category: BoardManagerResponse;
  searchType: SearchType;
  searchWord: string;
  onSearch: (type: SearchType, word: string) => void;
};

function BoardListFilterBar({ category, searchType, searchWord, onSearch }: BoardListFilterBarProps) {
  const [field, setField] = useState<SearchType>(searchType);
  const [keyword, setKeyword] = useState(searchWord);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(field, keyword);
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <form onSubmit={handleSubmit} className="grid w-full gap-4 sm:grid-cols-[150px_minmax(220px,1fr)_auto] sm:items-end">
        <div className="flex flex-col gap-0">
          <Label htmlFor="board-search-field" className="sr-only">
            검색 항목
          </Label>
          <Select value={field} onValueChange={(value) => setField(value as SearchType)}>
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
        <Link href={`/board/${category.boardCode}/write`}>만들기</Link>
      </Button>
    </div>
  );
}

type BoardTableProps = {
  category: BoardManagerResponse;
  articles: BoardArticleResponse[];
  page: number;
  pageSize: number;
  totalCount: number;
  onDelete: (boardArticleSeq: number) => Promise<void>;
};

function BoardTable({ category, articles, page, pageSize, totalCount, onDelete }: BoardTableProps) {
  const searchParams = useSearchParams();
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  if (totalCount === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
        게시글이 없습니다.
      </div>
    );
  }

  const startNumber = totalCount - (page - 1) * pageSize;

  // Build query string to preserve search params
  const buildQueryString = () => {
    const params = new URLSearchParams();
    const searchType = searchParams.get('searchType');
    const word = searchParams.get('word');
    const pageParam = searchParams.get('page');

    if (searchType) params.set('searchType', searchType);
    if (word) params.set('word', word);
    if (pageParam) params.set('page', pageParam);

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  };

  const handleDeleteClick = (boardArticleSeq: number) => {
    setDeleteTarget(boardArticleSeq);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTarget === null) return;

    setIsDeleting(true);
    try {
      await onDelete(deleteTarget);
      setDeleteTarget(null);
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  const queryString = buildQueryString();

  return (
    <>
      <div className="overflow-x-auto">
        <Table className="table-fixed">
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-16 text-center">#</TableHead>
              <TableHead className="w-auto">제목</TableHead>
              <TableHead className="w-40 text-center">날짜</TableHead>
              <TableHead className="w-32 text-center">기능</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article, index) => {
              const number = startNumber - index;
              const detailHref = `/board/${category.boardCode}/${article.boardArticleSeq}${queryString}`;
              const date = new Date(article.regDate);
              const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
              return (
                <TableRow key={article.boardArticleSeq} className="transition-colors hover:bg-muted/60 dark:hover:bg-muted/30">
                  <TableCell className="text-center text-sm text-muted-foreground">{number}</TableCell>
                  <TableCell className="max-w-0">
                    <Link href={detailHref} className="flex min-w-0 items-center gap-2 text-sky-600 hover:underline">
                      <span className="truncate">{article.title}</span>
                      {article.attachFileList && article.attachFileList.length > 0 ? (
                        <span className="flex-shrink-0 text-muted-foreground" title={`첨부파일 ${article.attachFileList.length}개`}>
                          <Paperclip className="h-4 w-4" />
                        </span>
                      ) : null}
                      {article.encryptF ? (
                        <span className="flex-shrink-0 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">암호화</span>
                      ) : null}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">{formattedDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Link href={`${detailHref}/edit`} className="text-primary hover:underline">
                        수정
                      </Link>
                      <span className="text-muted-foreground/40">|</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(article.boardArticleSeq)}
                        className={cn('text-destructive transition-colors hover:text-destructive/80')}
                      >
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

      {/* Delete Confirmation Dialog */}
      {deleteTarget !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-foreground">게시글 삭제</h3>
            <p className="mb-6 text-sm text-muted-foreground">이 게시글을 삭제하시겠습니까?</p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleDeleteCancel} disabled={isDeleting}>
                취소
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isDeleting}>
                {isDeleting ? '삭제 중...' : '삭제'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
