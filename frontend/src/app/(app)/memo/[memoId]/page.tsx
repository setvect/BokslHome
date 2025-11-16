import { notFound } from 'next/navigation';

import { MEMO_ITEMS, getMemoCategories, getMockMemoItem } from '@/lib/mock/data/memo';

import { MemoEditor } from '../_components/memo-editor';

interface MemoDetailPageProps {
  params: {
    memoId: string;
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return MEMO_ITEMS.map((item) => ({ memoId: String(item.id) }));
}

export default function MemoDetailPage({ params }: MemoDetailPageProps) {
  const memoId = Number(params.memoId);
  const memo = getMockMemoItem(memoId);
  const categories = getMemoCategories();

  if (!memo) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-foreground">메모</h1>
      </header>
      <MemoEditor memo={memo} categories={categories} mode="edit" />
    </div>
  );
}

