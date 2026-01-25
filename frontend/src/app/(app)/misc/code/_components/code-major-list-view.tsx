'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Plus, FolderOpen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { CodeMajorGroupResponse } from '@/lib/types/code';
import { CodeMajorFormDialog } from './code-major-form-dialog';

interface CodeMajorListViewProps {
  majorCodes: CodeMajorGroupResponse[];
  isLoading: boolean;
  onRefresh: () => void;
}

export function CodeMajorListView({ majorCodes, isLoading, onRefresh }: CodeMajorListViewProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* 액션 바 */}
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex justify-end">
          <Button type="button" onClick={() => setIsCreateDialogOpen(true)} className="h-10">
            <Plus className="mr-2 h-4 w-4" />새 코드 추가
          </Button>
        </div>
      </section>

      {/* 테이블 */}
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-16 text-center">#</TableHead>
              <TableHead>메이저 코드</TableHead>
              <TableHead className="w-32 text-center">코드 수</TableHead>
              <TableHead className="w-32 text-center">기능</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  데이터를 불러오는 중...
                </TableCell>
              </TableRow>
            ) : majorCodes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  등록된 코드가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              majorCodes.map((code, index) => (
                <TableRow key={code.majorCode} className="transition-colors hover:bg-muted/60">
                  <TableCell className="text-center font-semibold text-muted-foreground">{index + 1}</TableCell>
                  <TableCell>
                    <Link href={`/misc/code/${code.majorCode}`} className="flex items-center gap-2 text-primary hover:underline">
                      <FolderOpen className="h-4 w-4" />
                      {code.majorCode}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {code.count}개
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Link href={`/misc/code/${code.majorCode}`} className="text-sm text-primary hover:underline">
                      상세보기
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 새 코드 추가 다이얼로그 */}
      <CodeMajorFormDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} onSuccess={onRefresh} />
    </div>
  );
}
