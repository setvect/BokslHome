'use client';

import { useState } from 'react';
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

interface CodeMajorFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CodeMajorFormDialog({ open, onOpenChange, onSuccess }: CodeMajorFormDialogProps) {
  const [majorCode, setMajorCode] = useState('');
  const [minorCode, setMinorCode] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [orderNo, setOrderNo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setMajorCode('');
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
        majorCode: majorCode.trim(),
        minorCode: minorCode.trim(),
        codeValue: codeValue.trim(),
        orderNo,
      };

      await apiClient.post<CodeResponse>('/api/code', request);
      resetForm();
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.data?.message || '코드 생성에 실패했습니다.');
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
          <DialogTitle>새 코드 추가</DialogTitle>
          <DialogDescription>
            새로운 메이저 코드와 첫 번째 마이너 코드를 입력하세요.
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
              <Label htmlFor="majorCode">메이저 코드</Label>
              <Input
                id="majorCode"
                value={majorCode}
                onChange={(e) => setMajorCode(e.target.value.toUpperCase())}
                placeholder="예: USER_TYPE"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minorCode">마이너 코드</Label>
              <Input
                id="minorCode"
                value={minorCode}
                onChange={(e) => setMinorCode(e.target.value.toUpperCase())}
                placeholder="예: ADMIN"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codeValue">코드 값</Label>
              <Input
                id="codeValue"
                value={codeValue}
                onChange={(e) => setCodeValue(e.target.value)}
                placeholder="예: 관리자"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orderNo">정렬 순서</Label>
              <Input
                id="orderNo"
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
                  저장 중...
                </>
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

