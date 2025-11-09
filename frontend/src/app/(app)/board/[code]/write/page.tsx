import { notFound } from 'next/navigation';

import { BOARD_CATEGORIES, BOARD_CATEGORY_BY_CODE } from '@/lib/constants/board';
import type { BoardCode } from '@/lib/types/board';

import { BoardForm } from '../../_components/board-form';

interface BoardWritePageProps {
  params: {
    code: string;
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return BOARD_CATEGORIES.map((category) => ({ code: category.code }));
}

export default function BoardWritePage({ params }: BoardWritePageProps) {
  const normalizedCode = params.code.toUpperCase() as BoardCode;

  const category = BOARD_CATEGORY_BY_CODE[normalizedCode];
  if (!category) {
    notFound();
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
