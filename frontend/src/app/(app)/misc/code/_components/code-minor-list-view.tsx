'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Plus, Pencil, Trash2, ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginationNav } from '@/components/ui/pagination-nav';
import type { CodeResponse } from '@/lib/types/code';
import { CodeFormDialog } from './code-form-dialog';
import { CodeDeleteDialog } from './code-delete-dialog';

interface CodeMinorListViewProps {
  majorCode: string;
  codes: CodeResponse[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
}

export function CodeMinorListView({ majorCode, codes, isLoading, page, totalPages, onPageChange, onRefresh }: CodeMinorListViewProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<CodeResponse | null>(null);
  const [deletingCode, setDeletingCode] = useState<CodeResponse | null>(null);

  return (
    <div className="space-y-4">
      {/* 액션 바 */}
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/misc/code">
              <ChevronLeft className="mr-1 h-4 w-4" />
              코드 목록으로
            </Link>
          </Button>
          <Button type="button" onClick={() => setIsCreateDialogOpen(true)} className="h-10">
            <Plus className="mr-2 h-4 w-4" />
            마이너 코드 추가
          </Button>
        </div>
      </section>

      {/* 테이블 */}
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-20 text-center">순번</TableHead>
              <TableHead className="w-32 text-center">코드 ID</TableHead>
              <TableHead>마이너 코드</TableHead>
              <TableHead>코드 값</TableHead>
              <TableHead className="w-24 text-center">정렬</TableHead>
              <TableHead className="w-32 text-center">기능</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  데이터를 불러오는 중...
                </TableCell>
              </TableRow>
            ) : codes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  등록된 마이너 코드가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              codes.map((code, index) => (
                <TableRow key={code.codeSeq} className="transition-colors hover:bg-muted/60">
                  <TableCell className="text-center font-semibold text-muted-foreground">{(page - 1) * 10 + index + 1}</TableCell>
                  <TableCell className="text-center text-xs text-muted-foreground">{code.codeSeq}</TableCell>
                  <TableCell className="font-medium">{code.minorCode}</TableCell>
                  <TableCell>{code.codeValue}</TableCell>
                  <TableCell className="text-center">{code.orderNo}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary hover:text-primary"
                        onClick={() => setEditingCode(code)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => setDeletingCode(code)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center">
        <PaginationNav page={page} total={Math.max(totalPages, 1) * 10} pageSize={10} onPageChange={onPageChange} />
      </div>

      {/* 생성 다이얼로그 */}
      <CodeFormDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} majorCode={majorCode} onSuccess={onRefresh} />

      {/* 수정 다이얼로그 */}
      <CodeFormDialog
        open={!!editingCode}
        onOpenChange={(open) => !open && setEditingCode(null)}
        majorCode={majorCode}
        editingCode={editingCode}
        onSuccess={onRefresh}
      />

      {/* 삭제 다이얼로그 */}
      <CodeDeleteDialog
        open={!!deletingCode}
        onOpenChange={(open) => !open && setDeletingCode(null)}
        code={deletingCode}
        onSuccess={onRefresh}
      />
    </div>
  );
}
