'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import type { NoteDocument } from '@/lib/types/note';

type NoteDetailViewProps = {
  note: NoteDocument;
};

export function NoteDetailView({ note }: NoteDetailViewProps) {
  const hasLinks = Boolean(note.links?.length);
  const hasAttachments = Boolean(note.attachments?.length);

  return (
    <section className="rounded-3xl border border-border bg-card shadow-sm transition-colors">
      <div className="space-y-6 p-6">
        <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{note.title}</h2>
          </div>
          <div className="text-sm text-muted-foreground md:text-right">
            <div>
              <span className="font-medium text-foreground">등록일:</span> {note.createdAt}
            </div>
          </div>
        </header>

        {hasLinks ? (
          <ul className="list-disc space-y-2 pl-6">
            {note.links?.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        {hasAttachments ? (
          <div className="space-y-4 rounded-2xl border border-border/60 bg-muted/20 p-4">
            {note.attachments?.map((attachment) => (
              <figure key={attachment.id} className="space-y-2">
                <div className="overflow-hidden rounded-xl border border-border/60">
                  <img src={attachment.url} alt={attachment.description ?? attachment.id} className="h-auto w-full object-cover" />
                </div>
                {attachment.description ? <figcaption className="text-sm text-muted-foreground">{attachment.description}</figcaption> : null}
              </figure>
            ))}
          </div>
        ) : null}

        <article className="rounded-3xl bg-muted/40 p-8 text-base leading-relaxed text-foreground whitespace-pre-wrap transition-colors dark:bg-muted/60">
          {note.content}
        </article>
      </div>

      <footer className="flex flex-wrap justify-end gap-2 border-t border-border p-6">
        <Button variant="outline" asChild className="w-full sm:w-28">
          <Link href="/note">목록</Link>
        </Button>
      </footer>
    </section>
  );
}

