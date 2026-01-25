'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
import { getCodePage } from '@/lib/api/code-api-client';
import { getKnowledgePage } from '@/lib/api/knowledge-api-client';
import type { KnowledgeResponse } from '@/lib/types/knowledge-api';

export function KnowledgeListView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL 파라미터를 즉시 읽어서 초기 상태로 설정
  const initialCategory = searchParams.get('category') || '';
  const initialKeyword = searchParams.get('keyword') || '';
  const initialPage = searchParams.get('page');

  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>(initialCategory);
  const [keyword, setKeyword] = useState(initialKeyword); // 입력 중인 키워드
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword); // 실제 검색에 사용되는 키워드
  const [currentPage, setCurrentPage] = useState(initialPage ? parseInt(initialPage, 10) : 0);
  const [pageSize] = useState(10);

  const [documents, setDocuments] = useState<KnowledgeResponse[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // URL params가 변경되면 상태 업데이트 (뒤로가기/앞으로가기 대응)
  useEffect(() => {
    const categoryParam = searchParams.get('category') || '';
    const keywordParam = searchParams.get('keyword') || '';
    const pageParam = searchParams.get('page');

    setCategory(categoryParam);
    setKeyword(keywordParam);
    setSearchKeyword(keywordParam);
    setCurrentPage(pageParam ? parseInt(pageParam, 10) : 0);
  }, [searchParams]);

  // Update URL when search params change
  const updateURL = (newCategory: string, newKeyword: string, newPage: number) => {
    const params = new URLSearchParams();
    if (newCategory) {
      params.set('category', newCategory);
    }
    if (newKeyword) {
      params.set('keyword', newKeyword);
    }
    if (newPage > 0) {
      params.set('page', newPage.toString());
    }

    const queryString = params.toString();
    router.push(`/knowledge${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const codeResponse = await getCodePage({
          majorCode: 'KNOW_TYPE',
          size: 100,
          sort: 'orderNo,asc',
        });
        // Remove duplicates using Set
        const uniqueCategories = Array.from(new Set(codeResponse.content.map((code) => code.minorCode)));
        setCategories(uniqueCategories);

        // Only set default category if URL doesn't have one
        const urlCategory = searchParams.get('category');
        if (!urlCategory && uniqueCategories.length > 0) {
          setCategory('all');
          updateURL('all', searchKeyword, 0);
        }
      } catch (err) {
        console.error('Failed to fetch knowledge categories:', err);
        // Continue with empty categories on error
      }
    };

    fetchCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch data when category, searchKeyword, or page changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getKnowledgePage({
          classifyC: category && category !== 'all' ? category : undefined,
          content: searchKeyword || undefined,
          page: currentPage,
          size: pageSize,
        });

        setDocuments(response.content);
        setTotalPages(response.page.totalPages);
      } catch (err) {
        console.error('Failed to fetch knowledge data:', err);
        setError('데이터를 불러오는데 실패했습니다.');
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, searchKeyword, currentPage, pageSize]); // keyword 제거, searchKeyword만 사용

  // Reset to first page when category or search changes
  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(0);
    updateURL(value, searchKeyword, 0);
  };

  const handleSearch = () => {
    setSearchKeyword(keyword); // 검색 버튼 클릭 시에만 searchKeyword 업데이트
    setCurrentPage(0);
    updateURL(category, keyword, 0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL(category, keyword, page);
  };

  // HTML 태그 제거 함수
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // 텍스트 미리보기 (HTML 제거 후 길이 제한)
  const getTextPreview = (text: string, maxLength = 100) => {
    const stripped = stripHtml(text);
    if (stripped.length > maxLength) {
      return stripped.substring(0, maxLength) + '...';
    }
    return stripped;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // 검색 조건을 포함한 상세 페이지 URL 생성
  const getDetailUrl = (knowledgeSeq: number) => {
    const params = new URLSearchParams();
    if (category) {
      params.set('category', category);
    }
    if (searchKeyword) {
      params.set('keyword', searchKeyword);
    }
    if (currentPage > 0) {
      params.set('page', currentPage.toString());
    }

    const queryString = params.toString();
    return `/knowledge/${knowledgeSeq}${queryString ? `?${queryString}` : ''}`;
  };

  return (
    <section className="space-y-4">
      <KnowledgeSearchBar
        categories={categories}
        category={category}
        keyword={keyword}
        onCategoryChange={handleCategoryChange}
        onKeywordChange={setKeyword}
        onSearch={handleSearch}
      />

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <Table className="table-fixed">
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-16 text-center">#</TableHead>
              <TableHead className="w-28 text-center">분류</TableHead>
              <TableHead className="w-auto">질문</TableHead>
              <TableHead className="w-auto">답변</TableHead>
              <TableHead className="w-32 text-center">등록일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  로딩 중...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-destructive">
                  {error}
                </TableCell>
              </TableRow>
            ) : documents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  조건에 맞는 항목이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              documents.map((document) => (
                <TableRow key={document.knowledgeSeq} className="text-sm">
                  <TableCell className="text-center font-medium text-muted-foreground">{document.knowledgeSeq}</TableCell>
                  <TableCell className="text-center">{document.classifyC}</TableCell>
                  <TableCell className="max-w-0">
                    <Link href={getDetailUrl(document.knowledgeSeq)} className="block truncate text-sky-600 hover:underline">
                      {getTextPreview(document.problem, 150)}
                    </Link>
                  </TableCell>
                  <TableCell className="max-w-0 text-muted-foreground">
                    {document.solution ? (
                      <span className="block truncate">{getTextPreview(document.solution, 150)}</span>
                    ) : (
                      <span className="text-muted-foreground/50">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">{formatDate(document.regDate)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 0 && <KnowledgePagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
    </section>
  );
}

type KnowledgeSearchBarProps = {
  categories: string[];
  category: string;
  keyword: string;
  onCategoryChange: (value: string) => void;
  onKeywordChange: (value: string) => void;
  onSearch: () => void;
};

function KnowledgeSearchBar({ categories, category, keyword, onCategoryChange, onKeywordChange, onSearch }: KnowledgeSearchBarProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="h-10 w-40">
          <SelectValue placeholder="분류 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">- 전체 -</SelectItem>
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
        onKeyDown={handleKeyDown}
        placeholder="검색어"
        className="h-10 w-full max-w-sm"
      />

      <Button type="button" onClick={onSearch} className="h-10 bg-sky-500 text-white hover:bg-sky-600">
        검색
      </Button>
    </div>
  );
}

type KnowledgePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function KnowledgePagination({ currentPage, totalPages, onPageChange }: KnowledgePaginationProps) {
  const maxVisiblePages = 5;
  const halfVisible = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(0, currentPage - halfVisible);
  const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(0, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
            className={`min-w-10 px-0 cursor-pointer ${currentPage === 0 ? 'pointer-events-none opacity-50' : ''}`}
          />
        </PaginationItem>

        {startPage > 0 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(0)} className="cursor-pointer">
                1
              </PaginationLink>
            </PaginationItem>
            {startPage > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {pageNumbers.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink onClick={() => onPageChange(pageNum)} isActive={pageNum === currentPage} className="cursor-pointer">
              {pageNum + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {endPage < totalPages - 1 && (
          <>
            {endPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(totalPages - 1)} className="cursor-pointer">
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages - 1 && onPageChange(currentPage + 1)}
            className={`min-w-10 px-0 cursor-pointer ${currentPage === totalPages - 1 ? 'pointer-events-none opacity-50' : ''}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
