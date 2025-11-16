import { getMemoCategories, getMockMemoCollection } from '@/lib/mock/data/memo';

import { MemoListView } from './_components/memo-list-view';

export const dynamic = 'force-static';

export default function MemoPage() {
  const { items } = getMockMemoCollection();
  const categories = getMemoCategories();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">메모</h1>
      </header>
      <MemoListView items={items} categories={categories} />
    </div>
  );
}
