'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { deleteBoardManager, getBoardManager } from '@/lib/api/board-manage-api-client';
import type { BoardManagerResponse } from '@/lib/types/board-manage-api';

export default function BoardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const boardCode = params.code as string;

  const [board, setBoard] = useState<BoardManagerResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleDelete = async () => {
    if (!window.confirm(`${board?.name} 게시판을 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await deleteBoardManager(boardCode);
      router.push('/board-manage');
    } catch (err) {
      console.error('Failed to delete board:', err);
      setError(err instanceof Error ? err.message : '게시판 삭제에 실패했습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-foreground">게시판 상세</h1>
        </header>
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
          로딩 중...
        </div>
      </div>
    );
  }

  if (error || !board) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-foreground">게시판 상세</h1>
        </header>
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error || '게시판을 찾을 수 없습니다.'}
        </div>
        <Button variant="outline" asChild>
          <Link href="/board-manage">목록으로</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">{board.name}</h1>
      </header>

      <section className="rounded-3xl border border-border bg-card shadow-sm transition-colors">
        <div className="space-y-4 p-6">
          <div className="grid gap-2 md:grid-cols-[160px_1fr]">
            <span className="text-sm font-medium text-muted-foreground md:text-base">코드</span>
            <span className="text-sm font-semibold text-foreground md:text-base">{board.boardCode}</span>
          </div>

          <div className="grid gap-2 md:grid-cols-[160px_1fr]">
            <span className="text-sm font-medium text-muted-foreground md:text-base">이름</span>
            <span className="text-sm text-foreground md:text-base">{board.name}</span>
          </div>

          <div className="grid gap-2 md:grid-cols-[160px_1fr]">
            <span className="text-sm font-medium text-muted-foreground md:text-base">업로드 용량제한</span>
            <span className="text-sm text-foreground md:text-base">{board.uploadLimit} KB</span>
          </div>

          <div className="grid gap-2 md:grid-cols-[160px_1fr]">
            <span className="text-sm font-medium text-muted-foreground md:text-base">댓글 사용</span>
            <span className="text-sm text-foreground md:text-base">{board.commentF ? '예' : '아니오'}</span>
          </div>

          <div className="grid gap-2 md:grid-cols-[160px_1fr]">
            <span className="text-sm font-medium text-muted-foreground md:text-base">파일 업로드</span>
            <span className="text-sm text-foreground md:text-base">{board.attachF ? '예' : '아니오'}</span>
          </div>

          <div className="grid gap-2 md:grid-cols-[160px_1fr]">
            <span className="text-sm font-medium text-muted-foreground md:text-base">암호화 글</span>
            <span className="text-sm text-foreground md:text-base">{board.encryptF ? '예' : '아니오'}</span>
          </div>
        </div>
        <footer className="flex flex-col gap-3 border-t border-border bg-muted/30 p-6 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/board-manage">목록</Link>
          </Button>
          <div className="flex w-full justify-end gap-2 sm:w-auto">
            <Button variant="secondary" asChild className="w-full sm:w-auto">
              <Link href={`/board-manage/${board.boardCode}/edit`}>수정</Link>
            </Button>
            <Button variant="destructive" className="w-full sm:w-auto" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        </footer>
      </section>
    </div>
  );
}
