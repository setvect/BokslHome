'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Loader2, Plus, Search, Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Input } from '@/components/ui/input';
import { PaginationNav } from '@/components/ui/pagination-nav';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { apiClient } from '@/lib/api-client';
import type { MemoCategoryResponse, MemoResponse } from '@/lib/types/memo';

import { MemoCategoryDialog } from './memo-category-dialog';

// 전체 카테고리를 나타내는 특수 값
const ALL_CATEGORY_SEQ = -1;

type MemoListViewProps = {
  categories: MemoCategoryResponse[];
  memos: MemoResponse[];
  selectedCategorySeq: number;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  searchWord: string;
  onCategoryChange: (categorySeq: number) => void;
  onSearch: (word: string) => void;
  onPageChange: (page: number) => void;
  onMemoDeleted: () => void;
  onCategoryUpdated: () => void;
};

export function MemoListView({
  categories,
  memos,
  selectedCategorySeq,
  isLoading,
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  searchWord,
  onCategoryChange,
  onSearch,
  onPageChange,
  onMemoDeleted,
  onCategoryUpdated,
}: MemoListViewProps) {
  const [inputKeyword, setInputKeyword] = useState(searchWord);
  const [deleteTarget, setDeleteTarget] = useState<MemoResponse | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  // searchWord prop이 변경되면 inputKeyword 동기화 (뒤로가기 등)
  useEffect(() => {
    setInputKeyword(searchWord);
  }, [searchWord]);

  // 검색 제출 처리
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputKeyword);
  };

  // 메모 삭제 처리
  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      setIsDeleting(true);
      await apiClient.delete(`/api/memo/${deleteTarget.memoSeq}`);
      setDeleteTarget(null);
      onMemoDeleted();
    } catch (err) {
      console.error('Failed to delete memo:', err);
      alert('메모 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  // 내용 미리보기 (첫 줄 또는 일부)
  const getContentPreview = (content: string, maxLength = 100) => {
    const firstLine = content.split('\n')[0];
    if (firstLine.length > maxLength) {
      return firstLine.substring(0, maxLength) + '...';
    }
    return firstLine;
  };

  // 날짜 포맷팅 (yyyy.MM.dd)
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}`;
    } catch {
      return dateString;
    }
  };

  // 행 번호 계산 (전체 기준 역순)
  const getRowNumber = (index: number) => {
    return totalElements - (currentPage - 1) * pageSize - index;
  };

  // 메모 상세 링크 URL 생성 (검색 조건 포함)
  const getMemoDetailUrl = (memoSeq: number) => {
    const urlParams = new URLSearchParams();
    if (selectedCategorySeq !== ALL_CATEGORY_SEQ) {
      urlParams.set('category', selectedCategorySeq.toString());
    }
    if (searchWord) {
      urlParams.set('word', searchWord);
    }
    if (currentPage > 1) {
      urlParams.set('page', (currentPage - 1).toString());
    }
    const queryString = urlParams.toString();
    return `/memo/${memoSeq}${queryString ? `?${queryString}` : ''}`;
  };

  return (
    <section className="space-y-4">
      {/* 검색/필터 영역 */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
      >
        <Select value={selectedCategorySeq.toString()} onValueChange={(value) => onCategoryChange(Number(value))}>
          <SelectTrigger className="h-10 w-48">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_CATEGORY_SEQ.toString()}>전체</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.categorySeq} value={category.categorySeq.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          value={inputKeyword}
          onChange={(event) => setInputKeyword(event.target.value)}
          placeholder="검색어"
          className="h-10 min-w-[200px] flex-1"
        />

        <Button type="submit" variant="outline" className="h-10">
          <Search className="mr-2 h-4 w-4" />
          검색
        </Button>

        <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(true)} className="h-10">
          <Settings className="mr-2 h-4 w-4" />
          카테고리 관리
        </Button>

        <Button asChild type="button" className="h-10 bg-teal-500 text-white hover:bg-teal-600">
          <Link href={selectedCategorySeq === ALL_CATEGORY_SEQ ? '/memo/create' : `/memo/create?category=${selectedCategorySeq}`}>
            <Plus className="mr-2 h-4 w-4" />
            만들기
          </Link>
        </Button>
      </form>

      {/* 메모 목록 테이블 */}
      <div className="rounded-2xl border border-border bg-card shadow-sm">
        <Table className="table-fixed">
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-16 text-center">#</TableHead>
              <TableHead className="w-auto">내용</TableHead>
              <TableHead className="w-28 text-center">수정일</TableHead>
              <TableHead className="w-20 text-center">삭제</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                </TableCell>
              </TableRow>
            ) : memos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  {searchWord ? '검색 결과가 없습니다.' : '등록된 메모가 없습니다.'}
                </TableCell>
              </TableRow>
            ) : (
              memos.map((memo, index) => (
                <TableRow key={memo.memoSeq} className="text-sm">
                  <TableCell className="text-center font-semibold text-muted-foreground">{getRowNumber(index)}</TableCell>
                  <TableCell className="max-w-0">
                    <Link href={getMemoDetailUrl(memo.memoSeq)} className="block truncate text-sky-600 hover:underline">
                      {getContentPreview(memo.content)}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">{formatDate(memo.editDate)}</TableCell>
                  <TableCell className="text-center">
                    <button type="button" onClick={() => setDeleteTarget(memo)} className="text-sky-600 hover:underline">
                      삭제
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 페이징 */}
      {totalPages > 0 && (
        <div className="flex justify-center">
          <PaginationNav page={currentPage} pageSize={pageSize} total={totalElements} onPageChange={onPageChange} />
        </div>
      )}

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="메모 삭제"
        description={`이 메모를 삭제하시겠습니까?`}
        confirmLabel={isDeleting ? '삭제 중...' : '삭제'}
        cancelLabel="취소"
        onConfirm={handleDelete}
      />

      {/* 카테고리 관리 다이얼로그 */}
      <MemoCategoryDialog
        open={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
        categories={categories}
        onUpdated={onCategoryUpdated}
      />
    </section>
  );
}
