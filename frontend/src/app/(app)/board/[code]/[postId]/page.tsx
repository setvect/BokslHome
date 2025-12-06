'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getBoardArticle } from '@/lib/api/board-article-api-client';
import { getBoardManager } from '@/lib/api/board-manage-api-client';
import type { BoardArticleResponse } from '@/lib/types/board-article-api';
import type { BoardManagerResponse } from '@/lib/types/board-manage-api';

import { BoardDetailView } from '../../_components/board-detail-view';

export default function BoardDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const code = params.code as string;
  const postId = Number(params.postId);

  const [boardSettings, setBoardSettings] = useState<BoardManagerResponse | null>(null);
  const [article, setArticle] = useState<BoardArticleResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch board settings
  useEffect(() => {
    const fetchBoardSettings = async () => {
      try {
        const settings = await getBoardManager(code);
        setBoardSettings(settings);
      } catch (err) {
        console.error('Failed to fetch board settings:', err);
        setError(err instanceof Error ? err.message : '게시판 설정을 불러오는데 실패했습니다.');
      }
    };

    if (code) {
      fetchBoardSettings();
    }
  }, [code]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (Number.isNaN(postId)) {
        setError('잘못된 요청입니다.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getBoardArticle(postId);
        setArticle(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch article:', err);
        setError(err instanceof Error ? err.message : '게시글을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [postId]);

  if (isLoading) {
    return (
      <>
        <header>
          <h1 className="text-3xl font-semibold text-foreground">{boardSettings?.name || '게시판'}</h1>
        </header>
        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
          로딩 중...
        </div>
      </>
    );
  }

  if (error || !article || !boardSettings) {
    return (
      <>
        <header>
          <h1 className="text-3xl font-semibold text-foreground">{boardSettings?.name || '게시판'}</h1>
        </header>
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error || '게시글을 찾을 수 없습니다.'}
        </div>
      </>
    );
  }

  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold text-foreground">{boardSettings.name}</h1>
      </header>
      <BoardDetailView category={boardSettings} article={article} searchParams={searchParams} />
    </>
  );
}
