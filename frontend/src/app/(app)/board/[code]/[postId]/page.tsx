import { notFound } from 'next/navigation';

import { BOARD_CATEGORY_BY_CODE } from '@/lib/constants/board';
import { BOARD_LIST_MOCK, getMockBoardPost } from '@/lib/mock/data/board';
import type { BoardCode } from '@/lib/types/board';

import { BoardDetailView } from '../../_components/board-detail-view';

interface BoardDetailPageProps {
  params: {
    code: string;
    postId: string;
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return BOARD_LIST_MOCK.flatMap((list) => list.posts.map((post) => ({ code: post.code, postId: String(post.id) })));
}

export default function BoardDetailPage({ params }: BoardDetailPageProps) {
  const normalizedCode = params.code.toUpperCase() as BoardCode;
  const postId = Number(params.postId);

  const category = BOARD_CATEGORY_BY_CODE[normalizedCode];
  if (!category || Number.isNaN(postId)) {
    notFound();
  }

  const post = getMockBoardPost(normalizedCode, postId);
  if (!post) {
    notFound();
  }

  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold text-foreground">{category.name}</h1>
      </header>
      <BoardDetailView category={category} post={post} />
    </>
  );
}
