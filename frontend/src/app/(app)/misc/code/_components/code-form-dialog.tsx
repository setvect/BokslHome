'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiClient, ApiError } from '@/lib/api-client';
import type { CodeRequest, CodeResponse } from '@/lib/types/code';

interface CodeFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  majorCode: string;
  editingCode?: CodeResponse | null;
  onSuccess: () => void;
}

export function CodeFormDialog({
  open,
  onOpenChange,
  majorCode,
  editingCode,
  onSuccess,
}: CodeFormDialogProps) {
  const isEditing = !!editingCode;

  const [minorCode, setMinorCode] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [orderNo, setOrderNo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingCode) {
      setMinorCode(editingCode.minorCode);
      setCodeValue(editingCode.codeValue);
      setOrderNo(editingCode.orderNo);
    } else {
      resetForm();
    }
  }, [editingCode]);

  const resetForm = () => {
    setMinorCode('');
    setCodeValue('');
    setOrderNo(0);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const request: CodeRequest = {
        majorCode,
        minorCode: minorCode.trim(),
        codeValue: codeValue.trim(),
        orderNo,
      };

      if (isEditing && editingCode) {
        await apiClient.put<CodeResponse>(`/api/code/${editingCode.codeSeq}`, request);
      } else {
        await apiClient.post<CodeResponse>('/api/code', request);
      }

      resetForm();
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.data?.message || `코드 ${isEditing ? '수정' : '생성'}에 실패했습니다.`);
      } else {
        setError('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? '코드 수정' : '마이너 코드 추가'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? '코드 정보를 수정합니다.'
              : `${majorCode} 그룹에 새로운 마이너 코드를 추가합니다.`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="edit-majorCode">메이저 코드</Label>
              <Input id="edit-majorCode" value={majorCode} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-minorCode">마이너 코드</Label>
              <Input
                id="edit-minorCode"
                value={minorCode}
                onChange={(e) => setMinorCode(e.target.value.toUpperCase())}
                placeholder="예: ADMIN"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-codeValue">코드 값</Label>
              <Input
                id="edit-codeValue"
                value={codeValue}
                onChange={(e) => setCodeValue(e.target.value)}
                placeholder="예: 관리자"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-orderNo">정렬 순서</Label>
              <Input
                id="edit-orderNo"
                type="number"
                value={orderNo}
                onChange={(e) => setOrderNo(parseInt(e.target.value) || 0)}
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
            >
              취소
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? '수정 중...' : '저장 중...'}
                </>
              ) : isEditing ? (
                '수정'
              ) : (
                '저장'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

