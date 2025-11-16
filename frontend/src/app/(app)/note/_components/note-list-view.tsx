'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import type { NoteDocument } from '@/lib/types/note';

const FIELD_OPTIONS = [
  { label: '제목', value: 'title' },
  { label: '내용', value: 'content' },
];

type NoteListViewProps = {
  notes: NoteDocument[];
  categories: string[];
};

export function NoteListView({ notes, categories }: NoteListViewProps) {
  const [category, setCategory] = useState('all');
  const [field, setField] = useState(FIELD_OPTIONS[0].value);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const filteredNotes = useMemo(() => {
    const trimmedKeyword = keyword.trim().toLowerCase();
    return notes.filter((note) => {
      const matchCategory = category === 'all' ? true : note.category === category;
      const targetField = field === 'title' ? note.title : note.content;
      const matchKeyword = trimmedKeyword.length === 0 ? true : targetField.toLowerCase().includes(trimmedKeyword);
      return matchCategory && matchKeyword;
    });
  }, [category, field, keyword, notes]);

  const totalPages = Math.max(1, Math.ceil(filteredNotes.length / pageSize));
  const paginatedNotes = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredNotes.slice(startIndex, startIndex + pageSize);
  }, [filteredNotes, page, pageSize]);

  // 페이지 수보다 현재 페이지가 커졌을 때 초기화
  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  return (
    <section className="space-y-4">
      <NoteSearchBar
        categories={categories}
        category={category}
        field={field}
        keyword={keyword}
        onCategoryChange={setCategory}
        onFieldChange={setField}
        onKeywordChange={setKeyword}
      />

      <div className="rounded-2xl border border-dashed border-border/60 bg-muted/30 px-4 py-2 text-sm font-medium text-muted-foreground">
        전체
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-16 text-center">#</TableHead>
              <TableHead className="w-32 text-center">분류</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-24 text-center">마크다운</TableHead>
              <TableHead className="w-32 text-center">날짜</TableHead>
              <TableHead className="w-32 text-center">기능</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedNotes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  조건에 맞는 노트가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              paginatedNotes.map((note) => (
                <TableRow key={note.id} className="text-sm">
                  <TableCell className="text-center font-semibold text-muted-foreground">{note.id}</TableCell>
                  <TableCell className="text-center">{note.category}</TableCell>
                  <TableCell>
                    <Link href={`/note/${note.id}`} className="text-sky-600 hover:underline">
                      {note.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">{note.markdown ? '예' : '아니요'}</TableCell>
                  <TableCell className="text-center">{note.createdAt}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button type="button" className="text-sky-600 hover:underline">
                        수정
                      </button>
                      <button type="button" className="text-sky-600 hover:underline">
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

      <NotePagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
}

type NoteSearchBarProps = {
  categories: string[];
  category: string;
  field: string;
  keyword: string;
  onCategoryChange: (value: string) => void;
  onFieldChange: (value: string) => void;
  onKeywordChange: (value: string) => void;
};

function NoteSearchBar({ categories, category, field, keyword, onCategoryChange, onFieldChange, onKeywordChange }: NoteSearchBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="h-10 min-w-[160px]">
          <SelectValue placeholder="==전체==" />
        </SelectTrigger>
        <SelectContent className="max-h-64">
          <SelectItem value="all">==전체==</SelectItem>
          {categories.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={field} onValueChange={onFieldChange}>
        <SelectTrigger className="h-10 w-32">
          <SelectValue placeholder="제목" />
        </SelectTrigger>
        <SelectContent>
          {FIELD_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input value={keyword} onChange={(event) => onKeywordChange(event.target.value)} placeholder="검색어" className="h-10 flex-1 min-w-[160px]" />

      <Button type="button" className="h-10 bg-sky-500 text-white hover:bg-sky-600">
        검색
      </Button>
    </div>
  );
}

function NotePagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (page: number) => void }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const maxButtons = 9;
  const visiblePages = totalPages > maxButtons ? pages.slice(0, maxButtons) : pages;

  function handleChange(nextPage: number) {
    if (nextPage >= 1 && nextPage <= totalPages) {
      onPageChange(nextPage);
    }
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="min-w-10 px-0" onClick={(event) => (event.preventDefault(), handleChange(page - 1))} />
        </PaginationItem>

        {visiblePages.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              href="#"
              isActive={number === page}
              onClick={(event) => {
                event.preventDefault();
                handleChange(number);
              }}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > maxButtons ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}

        <PaginationItem>
          <PaginationNext href="#" className="min-w-10 px-0" onClick={(event) => (event.preventDefault(), handleChange(page + 1))} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

