import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BOARD_CATEGORIES, BOARD_CATEGORY_BY_CODE } from '@/lib/constants/board';
import { getMockBoardList } from '@/lib/mock/data/board';
import type { BoardCode } from '@/lib/types/board';

import { BoardListView } from '../_components/board-list-view';

interface BoardPageProps {
  params: {
    code: string;
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return BOARD_CATEGORIES.map((category) => ({ code: category.code }));
}

export function generateMetadata({ params }: BoardPageProps): Metadata {
  const normalized = params.code.toUpperCase() as BoardCode;
  const category = BOARD_CATEGORY_BY_CODE[normalized];

  if (!category) {
    return { title: '게시판' };
  }

  return {
    title: category.name,
    description: category.description,
  };
}

export default function BoardCodePage({ params }: BoardPageProps) {
  const normalized = params.code.toUpperCase() as BoardCode;

  const category = BOARD_CATEGORY_BY_CODE[normalized];
  if (!category) {
    notFound();
  }

  const list = getMockBoardList(normalized);

  return <BoardListView category={category} list={list} />;
}
