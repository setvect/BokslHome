'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import type { KnowledgeResponse } from '@/lib/types/knowledge-api';

type KnowledgeDetailViewProps = {
  document: KnowledgeResponse;
};

export function KnowledgeDetailView({ document }: KnowledgeDetailViewProps) {
  const searchParams = useSearchParams();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // 검색 조건을 유지한 목록 URL 생성
  const getListUrl = () => {
    const params = new URLSearchParams();
    const category = searchParams.get('category');
    const keyword = searchParams.get('keyword');
    const page = searchParams.get('page');

    if (category) {
      params.set('category', category);
    }
    if (keyword) {
      params.set('keyword', keyword);
    }
    if (page) {
      params.set('page', page);
    }

    const queryString = params.toString();
    return `/knowledge${queryString ? `?${queryString}` : ''}`;
  };

  return (
    <section className="space-y-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <header className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">분류:</span>
        <span>{document.classifyC}</span>
        <span className="ml-auto">등록일: {formatDate(document.regDate)}</span>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-foreground">질문</h2>
        <div
          className="prose prose-sm max-w-none rounded-2xl border border-border bg-muted/20 p-4 dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: document.problem }}
        />
      </section>

      {document.solution && (
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">답변</h2>
          <div
            className="prose prose-sm max-w-none rounded-2xl border border-border bg-muted/20 p-4 dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: document.solution }}
          />
        </section>
      )}

      <footer className="flex flex-wrap justify-end gap-2 border-t border-border pt-4">
        <Button variant="outline" asChild className="w-full sm:w-24">
          <Link href={getListUrl()}>목록</Link>
        </Button>
      </footer>
    </section>
  );
}
