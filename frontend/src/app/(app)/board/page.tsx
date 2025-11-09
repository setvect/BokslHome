import { notFound } from 'next/navigation';

import { BOARD_CATEGORY_BY_CODE, DEFAULT_BOARD_CODE } from '@/lib/constants/board';
import { getMockBoardList } from '@/lib/mock/data/board';
import type { BoardCode } from '@/lib/types/board';

import { BoardListView } from './_components/board-list-view';

export default function BoardPage() {
  const code = DEFAULT_BOARD_CODE.toUpperCase() as BoardCode;
  const category = BOARD_CATEGORY_BY_CODE[code];

  if (!category) {
    notFound();
  }

  const list = getMockBoardList(code);

  return <BoardListView category={category} list={list} />;
}
