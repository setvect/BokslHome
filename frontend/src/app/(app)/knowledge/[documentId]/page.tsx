import { notFound } from 'next/navigation';

import { KNOWLEDGE_DOCUMENTS, getMockKnowledgeDocument } from '@/lib/mock/data/knowledge';

import { KnowledgeDetailView } from '../_components/knowledge-detail-view';

interface KnowledgeDetailPageProps {
  params: {
    documentId: string;
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return KNOWLEDGE_DOCUMENTS.map((document) => ({ documentId: String(document.id) }));
}

export default function KnowledgeDetailPage({ params }: KnowledgeDetailPageProps) {
  const document = getMockKnowledgeDocument(params.documentId);

  if (!document) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-foreground">지식</h1>
      <KnowledgeDetailView document={document} />
    </div>
  );
}

