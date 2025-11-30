'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getKnowledge } from '@/lib/api/knowledge-api-client';
import type { KnowledgeResponse } from '@/lib/types/knowledge-api';

import { KnowledgeDetailView } from '../_components/knowledge-detail-view';

export default function KnowledgeDetailPage() {
  const params = useParams();
  const documentId = params.documentId as string;
  const knowledgeSeq = parseInt(documentId, 10);

  const [document, setDocument] = useState<KnowledgeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isNaN(knowledgeSeq)) {
        setError('잘못된 ID입니다.');
        setLoading(false);
        return;
      }

      try {
        const data = await getKnowledge(knowledgeSeq);
        setDocument(data);
      } catch (err) {
        console.error('Failed to fetch knowledge:', err);
        setError('데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [knowledgeSeq]);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold text-foreground">지식</h1>
        <div className="flex h-64 items-center justify-center text-muted-foreground">
          로딩 중...
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold text-foreground">지식</h1>
        <div className="flex h-64 items-center justify-center text-destructive">
          {error || '데이터를 찾을 수 없습니다.'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-foreground">지식</h1>
      <KnowledgeDetailView document={document} />
    </div>
  );
}

