'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getBoardManager, updateBoardManager } from '@/lib/api/board-manage-api-client';
import type { BoardManagerResponse } from '@/lib/types/board-manage-api';

import { BoardForm, type BoardFormValues } from '../../_components/board-manage-form';

const toYesNo = (value: boolean) => (value ? 'yes' : 'no') as 'yes' | 'no';

export default function BoardEditPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const boardCode = params.code as string;
  const PAGE_TITLE = '게시판 관리';

  const [board, setBoard] = useState<BoardManagerResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Build query string to preserve list state
  const queryString = searchParams.toString();
  const listUrl = `/board-manage${queryString ? `?${queryString}` : ''}`;

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        setIsLoading(true);
        const data = await getBoardManager(boardCode);
        setBoard(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch board:', err);
        setError(err instanceof Error ? err.message : '게시판 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoard();
  }, [boardCode]);

  const handleSubmit = async (values: BoardFormValues) => {
    try {
      await updateBoardManager(boardCode, {
        boardCode: values.code,
        name: values.name,
        uploadLimit: Number(values.uploadLimit),
        replyF: false, // Not in form, keep existing value
        commentF: values.allowComments === 'yes',
        attachF: values.allowFiles === 'yes',
        encryptF: values.allowEncryptedPosts === 'yes',
        deleteF: false,
      });

      // Navigate to list page without params after successful update
      router.push('/board-manage');
    } catch (err) {
      console.error('Failed to update board:', err);
      setError(err instanceof Error ? err.message : '게시판 수정에 실패했습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-foreground">{PAGE_TITLE}</h1>
        </header>
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">로딩 중...</div>
      </div>
    );
  }

  if (error || !board) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-foreground">{PAGE_TITLE}</h1>
        </header>
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error || '게시판을 찾을 수 없습니다.'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">{PAGE_TITLE}</h1>
      </header>

      <BoardForm
        mode="edit"
        submitLabel="저장"
        cancelHref={listUrl}
        initialValues={{
          code: board.boardCode,
          name: board.name,
          uploadLimit: String(board.uploadLimit ?? ''),
          allowComments: toYesNo(board.commentF),
          allowFiles: toYesNo(board.attachF),
          allowEncryptedPosts: toYesNo(board.encryptF),
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
