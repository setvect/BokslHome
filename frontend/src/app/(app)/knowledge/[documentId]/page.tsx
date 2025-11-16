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
      <header className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Knowledge Detail</p>
        <h1 className="text-3xl font-semibold text-foreground">{document.title}</h1>
        <p className="text-sm text-muted-foreground">
          분류: {document.category} · 등록일 {document.createdAt} · 수정일 {document.updatedAt}
        </p>
      </header>
      <KnowledgeDetailView document={document} />
    </div>
  );
}

