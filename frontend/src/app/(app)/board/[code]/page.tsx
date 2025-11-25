import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BOARD_CATEGORIES, BOARD_CATEGORY_BY_CODE } from '@/lib/constants/board';
import { getMockBoardList } from '@/lib/mock/data/board';
import type { BoardCode } from '@/lib/types/board';

import { BoardListView } from '../_components/board-list-view';

interface BoardPageProps {
  params: Promise<{
    code: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return BOARD_CATEGORIES.map((category) => ({ code: category.code }));
}

export async function generateMetadata({ params }: BoardPageProps): Promise<Metadata> {
  const { code } = await params;
  const normalized = code.toUpperCase() as BoardCode;
  const category = BOARD_CATEGORY_BY_CODE[normalized];

  if (!category) {
    return { title: '게시판' };
  }

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function BoardCodePage({ params }: BoardPageProps) {
  const { code } = await params;
  const normalized = code.toUpperCase() as BoardCode;

  const category = BOARD_CATEGORY_BY_CODE[normalized];
  if (!category) {
    notFound();
  }

  const list = getMockBoardList(normalized);

  return <BoardListView category={category} list={list} />;
}
