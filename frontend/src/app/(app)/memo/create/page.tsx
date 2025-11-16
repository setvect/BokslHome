import { getMemoCategories } from '@/lib/mock/data/memo';

import { MemoEditor } from '../_components/memo-editor';

export const dynamic = 'force-static';

export default function MemoCreatePage() {
  const categories = getMemoCategories();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-foreground">메모 작성</h1>
        <p className="text-sm text-muted-foreground">간단한 링크나 기억하고 싶은 문장을 적어 두세요.</p>
      </header>
      <MemoEditor categories={categories} mode="create" />
    </div>
  );
}

