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
import { getNoteCategoryTree, getNotePage } from '@/lib/api/note-api-client';
import type { NoteResponse, NoteCategoryResponse, TreeNode, NoteCategoryTreeData } from '@/lib/types/note-api';

const FIELD_OPTIONS = [
  { label: '제목', value: 'title' },
  { label: '내용', value: 'content' },
];

export function NoteListView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL 파라미터를 즉시 읽어서 초기 상태로 설정
  const initialCategory = searchParams.get('category') || '';
  const initialField = searchParams.get('field') || FIELD_OPTIONS[0].value;
  const initialKeyword = searchParams.get('keyword') || '';
  const initialPage = searchParams.get('page');

  const [categories, setCategories] = useState<NoteCategoryResponse[]>([]);
  const [category, setCategory] = useState<string>(initialCategory);
  const [field, setField] = useState(initialField);
  const [keyword, setKeyword] = useState(initialKeyword); // 입력 중인 키워드
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword); // 실제 검색에 사용되는 키워드
  const [currentPage, setCurrentPage] = useState(initialPage ? parseInt(initialPage, 10) : 0);
  const [pageSize] = useState(10);

  const [documents, setDocuments] = useState<NoteResponse[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // URL params가 변경되면 상태 업데이트 (뒤로가기/앞으로가기 대응)
  useEffect(() => {
    const categoryParam = searchParams.get('category') || '';
    const fieldParam = searchParams.get('field') || FIELD_OPTIONS[0].value;
    const keywordParam = searchParams.get('keyword') || '';
    const pageParam = searchParams.get('page');

    setCategory(categoryParam);
    setField(fieldParam);
    setKeyword(keywordParam);
    setSearchKeyword(keywordParam);
    setCurrentPage(pageParam ? parseInt(pageParam, 10) : 0);
  }, [searchParams]);

  // Update URL when search params change
  const updateURL = (newCategory: string, newField: string, newKeyword: string, newPage: number) => {
    const params = new URLSearchParams();
    if (newCategory) params.set('category', newCategory);
    if (newField !== FIELD_OPTIONS[0].value) params.set('field', newField);
    if (newKeyword) params.set('keyword', newKeyword);
    if (newPage > 0) params.set('page', newPage.toString());

    const queryString = params.toString();
    router.push(`/note${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryTree = await getNoteCategoryTree();

        // 트리를 평탄화하면서 들여쓰기 정보 추가
        const flattenTree = (nodes: TreeNode<NoteCategoryTreeData>[], depth: number = 0): NoteCategoryResponse[] => {
          const result: NoteCategoryResponse[] = [];
          for (const node of nodes) {
            // node.data가 존재하는지 확인
            if (!node.data) {
              continue;
            }

            // ROOT 카테고리는 제외하고 자식만 처리
            if (node.data.name === 'ROOT') {
              if (node.children && node.children.length > 0) {
                result.push(...flattenTree(node.children, 0));
              }
              continue;
            }

            // depth 정보를 포함한 카테고리 추가
            result.push({
              noteCategorySeq: node.data.id,
              name: '  '.repeat(depth) + node.data.name,
              parentCategorySeq: node.data.parentId || null,
              deleteF: false,
            });

            // 자식 노드 재귀적으로 처리
            if (node.children && node.children.length > 0) {
              result.push(...flattenTree(node.children, depth + 1));
            }
          }
          return result;
        };

        const flatCategories = flattenTree(categoryTree);
        setCategories(flatCategories);

        // URL에 카테고리가 없으면 '전체'를 기본값으로 설정
        const urlCategory = searchParams.get('category');
        if (!urlCategory) {
          setCategory('all');
          updateURL('all', field, searchKeyword, 0);
        }
      } catch (err) {
        console.error('Failed to fetch note categories:', err);
        // Continue with empty categories on error
      }
    };

    fetchCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch data when category, field, searchKeyword, or page changes
  useEffect(() => {
    const fetchData = async () => {
      // 카테고리가 선택되지 않았으면 데이터를 가져오지 않음
      if (!category) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const searchParams: {
          noteCategorySeq?: number;
          title?: string;
          content?: string;
          page: number;
          size: number;
        } = {
          page: currentPage,
          size: pageSize,
        };

        // 카테고리 필터 - 'all'이 아닌 경우에만 noteCategorySeq 추가
        if (category !== 'all') {
          const categorySeq = parseInt(category, 10);
          if (!isNaN(categorySeq)) {
            searchParams.noteCategorySeq = categorySeq;
          }
        }

        // 필드별 검색
        if (searchKeyword) {
          if (field === 'title') {
            searchParams.title = searchKeyword;
          } else if (field === 'content') {
            searchParams.content = searchKeyword;
          }
        }

        const response = await getNotePage(searchParams);

        setDocuments(response.content);
        setTotalPages(response.page.totalPages);
        setTotalElements(response.page.totalElements);
      } catch (err) {
        console.error('Failed to fetch note data:', err);
        setError('데이터를 불러오는데 실패했습니다.');
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, field, searchKeyword, currentPage, pageSize]);

  // Reset to first page when category, field, or search changes
  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(0);
    updateURL(value, field, searchKeyword, 0);
  };

  const handleFieldChange = (value: string) => {
    setField(value);
    setCurrentPage(0);
    updateURL(category, value, searchKeyword, 0);
  };

  const handleSearch = () => {
    setSearchKeyword(keyword); // 검색 버튼 클릭 시에만 searchKeyword 업데이트
    setCurrentPage(0);
    updateURL(category, field, keyword, 0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL(category, field, keyword, page);
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
  const getDetailUrl = (noteSeq: number) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (field !== FIELD_OPTIONS[0].value) params.set('field', field);
    if (searchKeyword) params.set('keyword', searchKeyword);
    if (currentPage > 0) params.set('page', currentPage.toString());

    const queryString = params.toString();
    return `/note/${noteSeq}${queryString ? `?${queryString}` : ''}`;
  };

  return (
    <section className="space-y-4">
      <NoteSearchBar
        categories={categories}
        category={category}
        field={field}
        keyword={keyword}
        onCategoryChange={handleCategoryChange}
        onFieldChange={handleFieldChange}
        onKeywordChange={setKeyword}
        onSearch={handleSearch}
      />

      <div className="rounded-2xl border border-dashed border-border/60 bg-muted/30 px-4 py-2 text-sm font-medium text-muted-foreground">
        전체 {totalElements}건
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
                  조건에 맞는 노트가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              documents.map((note) => {
                // 카테고리 이름 찾기
                const categoryName = categories.find(cat => cat.noteCategorySeq === note.noteCategorySeq)?.name || '-';

                return (
                  <TableRow key={note.noteSeq} className="text-sm">
                    <TableCell className="text-center font-semibold text-muted-foreground">{note.noteSeq}</TableCell>
                    <TableCell className="text-center">{categoryName}</TableCell>
                    <TableCell>
                      <Link href={getDetailUrl(note.noteSeq)} className="text-sky-600 hover:underline">
                        {note.title}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">{note.content.includes('```') || note.content.includes('#') ? '예' : '아니요'}</TableCell>
                    <TableCell className="text-center">{formatDate(note.regDate)}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 0 && (
        <NotePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}

type NoteSearchBarProps = {
  categories: NoteCategoryResponse[];
  category: string;
  field: string;
  keyword: string;
  onCategoryChange: (value: string) => void;
  onFieldChange: (value: string) => void;
  onKeywordChange: (value: string) => void;
  onSearch: () => void;
};

function NoteSearchBar({ categories, category, field, keyword, onCategoryChange, onFieldChange, onKeywordChange, onSearch }: NoteSearchBarProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="h-10 min-w-[160px]">
          <SelectValue placeholder="==전체==" />
        </SelectTrigger>
        <SelectContent className="max-h-64">
          <SelectItem value="all">==전체==</SelectItem>
          {categories.map((item) => (
            <SelectItem key={item.noteCategorySeq} value={String(item.noteCategorySeq)}>
              {item.name}
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

      <Input value={keyword} onChange={(event) => onKeywordChange(event.target.value)} onKeyDown={handleKeyDown} placeholder="검색어" className="h-10 flex-1 min-w-[160px]" />

      <Button type="button" onClick={onSearch} className="h-10 bg-sky-500 text-white hover:bg-sky-600">
        검색
      </Button>
    </div>
  );
}

type NotePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function NotePagination({ currentPage, totalPages, onPageChange }: NotePaginationProps) {
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
            <PaginationLink
              onClick={() => onPageChange(pageNum)}
              isActive={pageNum === currentPage}
              className="cursor-pointer"
            >
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
