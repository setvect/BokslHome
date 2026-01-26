'use client';

import { useState } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { apiClient, ApiError } from '@/lib/api-client';
import type { CodeResponse } from '@/lib/types/code';

interface CodeDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  code: CodeResponse | null;
  onSuccess: () => void;
}

export function CodeDeleteDialog({ open, onOpenChange, code, onSuccess }: CodeDeleteDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const handleDelete = async () => {
    if (!code) {
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await apiClient.delete(`/api/code/${code.codeSeq}`);
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(extractApiMessage(err) || '코드 삭제에 실패했습니다.');
      } else {
        setError('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setError(null);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            코드 삭제
          </DialogTitle>
          <DialogDescription>정말로 이 코드를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {error && <div className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
          {code && (
            <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">메이저 코드</span>
                <span className="text-sm font-medium">{code.majorCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">마이너 코드</span>
                <span className="text-sm font-medium">{code.minorCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">코드 값</span>
                <span className="text-sm font-medium">{code.codeValue}</span>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isLoading}>
            취소
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                삭제 중...
              </>
            ) : (
              '삭제'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
