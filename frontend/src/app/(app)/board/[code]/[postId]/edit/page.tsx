'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getBoardArticle } from '@/lib/api/board-article-api-client';
import { getBoardManager } from '@/lib/api/board-manage-api-client';
import { getBoardNameByCode } from '@/lib/constants/board-menu';
import type { BoardArticleResponse } from '@/lib/types/board-article-api';
import type { BoardManagerResponse } from '@/lib/types/board-manage-api';

import { BoardForm } from '../../../_components/board-form';
import { BoardPasswordGate } from '../../../_components/board-password-gate';

export default function BoardEditPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const code = params.code as string;
  const postId = Number(params.postId);
  const fallbackTitle = getBoardNameByCode(code) ?? '게시판';
  const headerTitle = (boardSettings: BoardManagerResponse | null) =>
    boardSettings?.name ?? fallbackTitle;

  const [boardSettings, setBoardSettings] = useState<BoardManagerResponse | null>(null);
  const [article, setArticle] = useState<BoardArticleResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [isLoadingDecryption, setIsLoadingDecryption] = useState(false);

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

  // Initial fetch without decryptKey
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
        // If not encrypted, unlock immediately
        if (!data.encryptF) {
          setUnlocked(true);
        }
      } catch (err) {
        console.error('Failed to fetch article:', err);
        setError(err instanceof Error ? err.message : '게시글을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [postId]);

  // Handle password submission for encrypted articles
  const handlePasswordSubmit = async (decryptKey: string) => {
    if (!article) return;

    setIsLoadingDecryption(true);

    try {
      const decryptedArticle = await getBoardArticle(article.boardArticleSeq, decryptKey);
      setArticle(decryptedArticle);
      setUnlocked(true);
    } catch (err) {
      console.error('Failed to fetch article:', err);
    } finally {
      setIsLoadingDecryption(false);
    }
  };

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

  if (error || !article || !boardSettings) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-foreground">{headerTitle(boardSettings)}</h1>
        </header>
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error || '게시글을 찾을 수 없습니다.'}
        </div>
      </div>
    );
  }

  // Show password gate for encrypted articles
  if (article.encryptF && !unlocked) {
    const listUrl = `/board/${boardSettings.boardCode}`;
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-foreground">{headerTitle(boardSettings)}</h1>
        </header>
        <BoardPasswordGate onPasswordSubmit={handlePasswordSubmit} isLoading={isLoadingDecryption} listUrl={listUrl} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">{headerTitle(boardSettings)}</h1>
      </header>
      <BoardForm category={boardSettings} article={article} mode="edit" searchParams={searchParams} />
    </div>
  );
}
