'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getBoardManager } from '@/lib/api/board-manage-api-client';
import { getBoardNameByCode } from '@/lib/constants/board-menu';
import type { BoardManagerResponse } from '@/lib/types/board-manage-api';

import { BoardForm } from '../../_components/board-form';

export default function BoardWritePage() {
  const params = useParams();
  const code = params.code as string;
  const fallbackTitle = getBoardNameByCode(code) ?? '게시판';
  const headerTitle = (boardSettings: BoardManagerResponse | null) =>
    boardSettings?.name ?? fallbackTitle;

  const [boardSettings, setBoardSettings] = useState<BoardManagerResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoardSettings = async () => {
      try {
        setIsLoading(true);
        const settings = await getBoardManager(code);
        setBoardSettings(settings);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch board settings:', err);
        setError(err instanceof Error ? err.message : '게시판 설정을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (code) {
      fetchBoardSettings();
    }
  }, [code]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-foreground">{headerTitle(boardSettings)}</h1>
        </header>
        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
          로딩 중...
        </div>
      </div>
    );
  }

  if (error || !boardSettings) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-foreground">{headerTitle(boardSettings)}</h1>
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
        <h1 className="text-3xl font-semibold text-foreground">{headerTitle(boardSettings)}</h1>
      </header>
      <BoardForm category={boardSettings} mode="create" />
    </div>
  );
}
