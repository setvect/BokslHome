'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import type { KnowledgeDocument } from '@/lib/types/knowledge';

type KnowledgeDetailViewProps = {
  document: KnowledgeDocument;
};

export function KnowledgeDetailView({ document }: KnowledgeDetailViewProps) {
  return (
    <section className="space-y-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <header className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">분류:</span>
        <span>{document.category}</span>
        <span className="ml-auto">등록일: {document.updatedAt}</span>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-foreground">질문</h2>
        <pre className="whitespace-pre-wrap rounded-2xl border border-border bg-muted/20 p-4 text-base leading-relaxed text-foreground">
          {document.questionDetail}
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-foreground">답변</h2>
        <div className="space-y-4 rounded-2xl border border-border bg-white p-4">
          <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground">{document.answerDetail}</p>

          {document.attachments?.length ? (
            <div className="space-y-4">
              {document.attachments.map((attachment) => (
                <figure key={attachment.id} className="rounded-xl border border-border/60 p-3">
                  <div className="overflow-hidden rounded-lg bg-black/5">
                    <img src={attachment.url} alt={attachment.description ?? attachment.filename} className="h-auto w-full object-cover" />
                  </div>
                  <figcaption className="mt-2 text-sm text-muted-foreground">{attachment.filename}</figcaption>
                </figure>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <footer className="flex flex-wrap justify-end gap-2 border-t border-border pt-4">
        <Button variant="outline" asChild className="w-full sm:w-24">
          <Link href="/knowledge">목록</Link>
        </Button>
        <Button variant="secondary" className="w-full sm:w-24">
          수정
        </Button>
        <Button variant="destructive" className="w-full sm:w-24">
          삭제
        </Button>
      </footer>
    </section>
  );
}
