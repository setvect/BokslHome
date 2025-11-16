'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

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
import type { KnowledgeDocument } from '@/lib/types/knowledge';

type KnowledgeListViewProps = {
  documents: KnowledgeDocument[];
  categories: string[];
};

export function KnowledgeListView({ documents, categories }: KnowledgeListViewProps) {
  const [category, setCategory] = useState<string>('all');
  const [keyword, setKeyword] = useState('');

  const filteredDocuments = useMemo(() => {
    const lowered = keyword.trim().toLowerCase();
    return documents.filter((document) => {
      const matchCategory = category === 'all' ? true : document.category === category;
      const matchKeyword =
        lowered.length === 0
          ? true
          : [document.question, document.answerSummary, document.answerReference ?? ''].some((text) =>
              text.toLowerCase().includes(lowered)
            );
      return matchCategory && matchKeyword;
    });
  }, [category, documents, keyword]);

  return (
    <section className="space-y-4">
      <KnowledgeSearchBar
        categories={categories}
        category={category}
        keyword={keyword}
        onCategoryChange={setCategory}
        onKeywordChange={setKeyword}
      />

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-16 text-center">#</TableHead>
              <TableHead className="w-28 text-center">분류</TableHead>
              <TableHead>질문</TableHead>
              <TableHead>답변</TableHead>
              <TableHead className="w-24 text-center">파일</TableHead>
              <TableHead className="w-20 text-center">수정</TableHead>
              <TableHead className="w-32 text-center">날짜</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                  조건에 맞는 항목이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              filteredDocuments.map((document) => (
                <TableRow key={document.id} className="text-sm">
                  <TableCell className="text-center font-medium text-muted-foreground">{document.id}</TableCell>
                  <TableCell className="text-center">{document.category}</TableCell>
                  <TableCell>
                    <Link href={`/knowledge/${document.id}`} className="text-sky-600 hover:underline">
                      {document.question}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {document.answerReference ? (
                      <a href={document.answerReference} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline">
                        {document.answerSummary}
                      </a>
                    ) : (
                      document.answerSummary
                    )}
                  </TableCell>
                  <TableCell className="text-center">{document.attachments?.length ?? 0}</TableCell>
                  <TableCell className="text-center">
                    <button type="button" className="text-sky-600 hover:underline">
                      수정
                    </button>
                  </TableCell>
                  <TableCell className="text-center">{document.updatedAt}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <KnowledgePagination />
    </section>
  );
}

type KnowledgeSearchBarProps = {
  categories: string[];
  category: string;
  keyword: string;
  onCategoryChange: (value: string) => void;
  onKeywordChange: (value: string) => void;
};

function KnowledgeSearchBar({ categories, category, keyword, onCategoryChange, onKeywordChange }: KnowledgeSearchBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="h-10 w-40">
          <SelectValue placeholder="--전체--" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">--전체--</SelectItem>
          {categories.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        value={keyword}
        onChange={(event) => onKeywordChange(event.target.value)}
        placeholder="검색어"
        className="h-10 w-full max-w-sm"
      />

      <Button type="button" className="h-10 bg-sky-500 text-white hover:bg-sky-600">
        검색
      </Button>

      <Button type="button" className="ml-auto h-10 bg-teal-500 text-white hover:bg-teal-600">
        만들기
      </Button>
    </div>
  );
}

function KnowledgePagination() {
  const pageNumbers = Array.from({ length: 9 }, (_, index) => index + 1);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="min-w-10 px-0" />
        </PaginationItem>
        {pageNumbers.slice(0, 3).map((number) => (
          <PaginationItem key={number}>
            <PaginationLink href="#" isActive={number === 1}>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {pageNumbers.slice(pageNumbers.length - 2).map((number) => (
          <PaginationItem key={number}>
            <PaginationLink href="#">{number}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" className="min-w-10 px-0" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
