'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { apiClient, ApiError } from '@/lib/api-client';
import type { MemoCategoryResponse, MemoRequest, MemoResponse } from '@/lib/types/memo';

type MemoEditorProps = {
  memo?: MemoResponse;
  categories: MemoCategoryResponse[];
  mode: 'create' | 'edit';
  defaultCategorySeq?: number;
  listUrl?: string;
};

export function MemoEditor({ memo, categories, mode, defaultCategorySeq, listUrl = '/memo' }: MemoEditorProps) {
  const router = useRouter();
  const isEdit = mode === 'edit';
  const extractApiMessage = (err: ApiError): string | undefined => {
    const data = err.data;
    if (data && typeof data === 'object' && 'message' in data) {
      const msg = (data as { message?: unknown }).message;
      if (typeof msg === 'string') {
        return msg;
      }
    }
    return undefined;
  };

  const [categorySeq, setCategorySeq] = useState<number | undefined>(memo?.categorySeq ?? defaultCategorySeq ?? categories[0]?.categorySeq);
  const [content, setContent] = useState(memo?.content ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 저장 처리 (생성/수정)
  const handleSubmit = async () => {
    if (!categorySeq) {
      setError('카테고리를 선택해주세요.');
      return;
    }
    if (!content.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }

    const request: MemoRequest = {
      memoCategorySeq: categorySeq,
      content: content.trim(),
    };

    try {
      setIsLoading(true);
      setError(null);

      if (isEdit && memo) {
        await apiClient.put<MemoResponse>(`/api/memo/${memo.memoSeq}`, request);
      } else {
        await apiClient.post<MemoResponse>('/api/memo', request);
      }

      // 저장 후 목록으로 돌아갈 때 선택한 카테고리 유지
      router.push(`/memo?category=${categorySeq}`);
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(extractApiMessage(err) || `메모 ${isEdit ? '수정' : '생성'}에 실패했습니다.`);
      } else {
        setError('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 삭제 처리
  const handleDelete = async () => {
    if (!memo) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await apiClient.delete(`/api/memo/${memo.memoSeq}`);
      setIsDeleteDialogOpen(false);
      // 삭제 후 목록으로 돌아갈 때 선택한 카테고리 유지
      router.push(`/memo?category=${categorySeq}`);
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(extractApiMessage(err) || '메모 삭제에 실패했습니다.');
      } else {
        setError('네트워크 오류가 발생했습니다.');
      }
    }
    setIsLoading(false);
  };

  return (
    <section className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-sm">
      {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="memo-editor-category" className="text-sm font-semibold text-muted-foreground">
            카테고리
          </Label>
          <Select value={categorySeq?.toString() ?? ''} onValueChange={(value) => setCategorySeq(Number(value))} disabled={isLoading}>
            <SelectTrigger id="memo-editor-category" className="h-10">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.categorySeq} value={category.categorySeq.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="memo-editor-content" className="text-sm font-semibold text-muted-foreground">
            내용
          </Label>
          <Textarea
            id="memo-editor-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[280px]"
            placeholder="메모 내용을 입력하세요."
            disabled={isLoading}
          />
        </div>
      </div>

      <footer className="flex flex-wrap justify-end gap-2 border-t border-border pt-4">
        <Button variant="outline" asChild className="w-full sm:w-28" disabled={isLoading}>
          <Link href={listUrl}>목록</Link>
        </Button>
        {isEdit && (
          <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)} className="w-full sm:w-28" disabled={isLoading}>
            삭제
          </Button>
        )}
        <Button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-teal-500 text-white hover:bg-teal-600 sm:w-28"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              저장 중...
            </>
          ) : (
            '확인'
          )}
        </Button>
      </footer>

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="메모 삭제"
        description="이 메모를 삭제하시겠습니까?"
        confirmLabel={isLoading ? '삭제 중...' : '삭제'}
        cancelLabel="취소"
        onConfirm={handleDelete}
      />
    </section>
  );
}
