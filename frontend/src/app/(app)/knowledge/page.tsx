import { getKnowledgeCategories, getMockKnowledgeCollection } from '@/lib/mock/data/knowledge';

import { KnowledgeListView } from './_components/knowledge-list-view';

export const dynamic = 'force-static';

export default function KnowledgePage() {
  const { documents } = getMockKnowledgeCollection();
  const categories = getKnowledgeCategories();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-foreground">지식</h1>
      <KnowledgeListView documents={documents} categories={categories} />
    </div>
  );
}
