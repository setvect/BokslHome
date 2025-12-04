'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getBoardArticle } from '@/lib/api/board-article-api-client';
import { BOARD_CATEGORY_BY_CODE } from '@/lib/constants/board';
import type { BoardArticleResponse } from '@/lib/types/board-article-api';
import type { BoardCode } from '@/lib/types/board';

import { BoardForm } from '../../../_components/board-form';

export default function BoardEditPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const code = (params.code as string)?.toUpperCase() as BoardCode;
  const postId = Number(params.postId);

  const category = BOARD_CATEGORY_BY_CODE[code];

  const [article, setArticle] = useState<BoardArticleResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!category || Number.isNaN(postId)) {
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
  }, [postId, category]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-foreground">{category?.name || '게시판'}</h1>
        </header>
        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
          로딩 중...
        </div>
      </div>
    );
  }

  if (error || !article || !category) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-foreground">{category?.name || '게시판'}</h1>
        </header>
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error || '게시글을 찾을 수 없습니다.'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">{category.name}</h1>
      </header>
      <BoardForm category={category} article={article} mode="edit" searchParams={searchParams} />
    </div>
  );
}
