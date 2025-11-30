'use client';

import { useEffect, useState } from 'react';

import { KnowledgeListView } from './_components/knowledge-list-view';

export default function KnowledgePage() {
  const [categories, setCategories] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-foreground">지식</h1>
      <KnowledgeListView />
    </div>
  );
}
