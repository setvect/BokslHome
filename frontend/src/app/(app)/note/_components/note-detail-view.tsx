'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import type { NoteDocument } from '@/lib/types/note';

type NoteDetailViewProps = {
  note: NoteDocument;
};

export function NoteDetailView({ note }: NoteDetailViewProps) {
  return (
    <section className="space-y-8 rounded-3xl border border-border bg-card shadow-sm">
      <header className="flex flex-col gap-3 border-b border-border p-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <span className="text-sm font-semibold text-muted-foreground">{note.category}</span>
          <h1 className="text-4xl font-semibold text-foreground">{note.title}</h1>
        </div>
        <div className="text-sm text-muted-foreground">
          <div>등록일: {note.createdAt}</div>
          <div>수정일: {note.updatedAt}</div>
        </div>
      </header>

      <div className="space-y-6 px-6">
        {note.links?.length ? (
          <ul className="list-disc space-y-2 pl-6">
            {note.links.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        {note.attachments?.length ? (
          <div className="space-y-4 rounded-2xl border border-border/60 bg-muted/20 p-4">
            {note.attachments.map((attachment) => (
              <figure key={attachment.id} className="space-y-2">
                <div className="overflow-hidden rounded-xl border border-border/60">
                  <img src={attachment.url} alt={attachment.description ?? attachment.id} className="h-auto w-full object-cover" />
                </div>
                {attachment.description ? <figcaption className="text-sm text-muted-foreground">{attachment.description}</figcaption> : null}
              </figure>
            ))}
          </div>
        ) : null}

        <article className="rounded-2xl bg-muted/30 p-6 text-base leading-relaxed text-foreground whitespace-pre-wrap">{note.content}</article>
      </div>

      <footer className="flex flex-wrap justify-end gap-2 border-t border-border p-6">
        <Button variant="outline" asChild className="w-full sm:w-28">
          <Link href="/note">목록</Link>
        </Button>
        <Button variant="secondary" className="w-full sm:w-28">
          수정
        </Button>
        <Button variant="destructive" className="w-full sm:w-28">
          삭제
        </Button>
      </footer>
    </section>
  );
}

