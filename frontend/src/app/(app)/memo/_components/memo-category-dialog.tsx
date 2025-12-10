'use client';

import { useEffect, useState } from 'react';
import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { apiClient, ApiError } from '@/lib/api-client';
import type { MemoCategoryResponse } from '@/lib/types/memo';

interface MemoCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: MemoCategoryResponse[];
  onUpdated: () => void;
}

export function MemoCategoryDialog({
  open,
  onOpenChange,
  categories: initialCategories,
  onUpdated,
}: MemoCategoryDialogProps) {
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

  const [categories, setCategories] = useState<MemoCategoryResponse[]>(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<MemoCategoryResponse | null>(null);
  const [editingName, setEditingName] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<MemoCategoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 모달이 열릴 때마다 최신 카테고리 목록 조회
  useEffect(() => {
    if (open) {
      const fetchCategories = async () => {
        try {
          setIsLoadingCategories(true);
          const data = await apiClient.get<MemoCategoryResponse[]>('/api/memo-category');
          setCategories(data);
        } catch (err) {
          console.error('Failed to fetch categories:', err);
          setError(err instanceof Error ? err.message : '카테고리를 불러오는데 실패했습니다.');
        } finally {
          setIsLoadingCategories(false);
        }
      };

      fetchCategories();
    }
  }, [open]);

  // 카테고리 목록 새로고침
  const refreshCategories = async () => {
    try {
      const data = await apiClient.get<MemoCategoryResponse[]>('/api/memo-category');
      setCategories(data);
    } catch (err) {
      console.error('Failed to refresh categories:', err);
    }
  };

  // 카테고리 추가
  const handleAdd = async () => {
    if (!newCategoryName.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      await apiClient.post('/api/memo-category', { name: newCategoryName.trim() });
      setNewCategoryName('');
      await refreshCategories();
      onUpdated();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(extractApiMessage(err) || '카테고리 추가에 실패했습니다.');
      } else {
        setError('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 카테고리 수정 시작
  const handleStartEdit = (category: MemoCategoryResponse) => {
    setEditingCategory(category);
    setEditingName(category.name);
    setError(null);
  };

  // 카테고리 수정 저장
  const handleSaveEdit = async () => {
    if (!editingCategory || !editingName.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      await apiClient.put(`/api/memo-category/${editingCategory.categorySeq}`, {
        name: editingName.trim(),
      });
      setEditingCategory(null);
      setEditingName('');
      await refreshCategories();
      onUpdated();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(extractApiMessage(err) || '카테고리 수정에 실패했습니다.');
      } else {
        setError('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 카테고리 수정 취소
  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditingName('');
  };

  // 카테고리 삭제
  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setIsLoading(true);
      setError(null);
      await apiClient.delete(`/api/memo-category/${deleteTarget.categorySeq}`);
      setDeleteTarget(null);
      await refreshCategories();
      onUpdated();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(extractApiMessage(err) || '카테고리 삭제에 실패했습니다.');
      } else {
        setError('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setNewCategoryName('');
      setEditingCategory(null);
      setEditingName('');
      setError(null);
    }
    onOpenChange(newOpen);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>카테고리 관리</DialogTitle>
            <DialogDescription>메모 카테고리를 추가, 수정, 삭제할 수 있습니다.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
            )}

            {/* 새 카테고리 추가 */}
            <div className="flex gap-2">
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="새 카테고리 이름"
                disabled={isLoading}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
              <Button type="button" onClick={handleAdd} disabled={isLoading || !newCategoryName.trim()}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              </Button>
            </div>

            {/* 카테고리 목록 */}
            <div className="max-h-64 space-y-2 overflow-y-auto">
              {isLoadingCategories ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                categories.map((category) => (
                <div
                  key={category.categorySeq}
                  className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 p-2"
                >
                  {editingCategory?.categorySeq === category.categorySeq ? (
                    <>
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="flex-1"
                        disabled={isLoading}
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleSaveEdit}
                        disabled={isLoading || !editingName.trim()}
                      >
                        저장
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={handleCancelEdit}>
                        취소
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 text-sm">
                        {category.name}
                        <span className="ml-2 text-xs text-muted-foreground">({category.memoCount}건)</span>
                      </span>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => handleStartEdit(category)}
                        disabled={isLoading}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {category.memoCount === 0 && (
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => setDeleteTarget(category)}
                          disabled={isLoading}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </>
                  )}
                </div>
                ))
              )}
              {!isLoadingCategories && categories.length === 0 && (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  등록된 카테고리가 없습니다.
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="카테고리 삭제"
        description={`"${deleteTarget?.name}" 카테고리를 삭제하시겠습니까?`}
        confirmLabel={isLoading ? '삭제 중...' : '삭제'}
        cancelLabel="취소"
        onConfirm={handleDelete}
      />
    </>
  );
}
