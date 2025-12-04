'use client';

import { useParams } from 'next/navigation';

import { BOARD_CATEGORY_BY_CODE } from '@/lib/constants/board';
import type { BoardCode } from '@/lib/types/board';

import { BoardForm } from '../../_components/board-form';

export default function BoardWritePage() {
  const params = useParams();
  const code = (params.code as string)?.toUpperCase() as BoardCode;
  const category = BOARD_CATEGORY_BY_CODE[code];

  if (!category) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-foreground">게시판</h1>
        </header>
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          게시판을 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">{category.name}</h1>
      </header>
      <BoardForm category={category} mode="create" />
    </div>
  );
}
