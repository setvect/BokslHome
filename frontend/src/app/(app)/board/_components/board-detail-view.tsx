'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import type { BoardCategory, BoardPostMock } from '@/lib/types/board';

import { BoardAttachmentList } from './board-attachment-list';
import { BoardPasswordGate } from './board-password-gate';

type BoardDetailViewProps = {
  category: BoardCategory;
  post: BoardPostMock;
};

export function BoardDetailView({ category, post }: BoardDetailViewProps) {
  const [unlocked, setUnlocked] = useState(!post.isEncrypted);

  if (!unlocked) {
    return <BoardPasswordGate expectedPassword={post.password} onSuccess={() => setUnlocked(true)} />;
  }

  const paragraphs = (post.content ?? '').split(/\n{2,}/).filter(Boolean);
  const detailHrefBase = `/board/${category.code}`;

  return (
    <section className="rounded-3xl border border-border bg-card shadow-sm transition-colors">
      <div className="space-y-6 p-6">
        <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <h2 className="text-4xl font-semibold text-foreground">{post.title}</h2>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <span className="font-medium text-foreground">등록일:</span> {post.createdAt}
          </div>
        </header>

        <article className="space-y-6 rounded-3xl bg-muted/40 p-8 text-foreground transition-colors dark:bg-muted/60">
          {paragraphs.length ? (
            paragraphs.map((paragraph, index) => (
              <p key={index} className="whitespace-pre-line text-lg leading-relaxed">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-lg leading-relaxed">{post.content}</p>
          )}
        </article>

        <BoardAttachmentList attachments={post.attachments} showDownload />
      </div>

      <footer className="flex flex-col gap-3 border-t border-border bg-muted/30 p-6 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="outline" asChild className="w-full sm:w-auto">
          <Link href={detailHrefBase}>목록</Link>
        </Button>
        <div className="flex w-full justify-end gap-2 sm:w-auto">
          <Button variant="secondary" asChild className="w-full sm:w-auto">
            <Link href={`${detailHrefBase}/${post.id}/edit`}>수정</Link>
          </Button>
          <Button type="button" variant="destructive" className="w-full sm:w-auto">
            삭제
          </Button>
        </div>
      </footer>
    </section>
  );
}
