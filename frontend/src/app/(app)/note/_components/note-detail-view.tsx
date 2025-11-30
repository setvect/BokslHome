'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import type { NoteResponse } from '@/lib/types/note-api';

type NoteDetailViewProps = {
  note: NoteResponse;
  listUrl: string;
};

export function NoteDetailView({ note, listUrl }: NoteDetailViewProps) {
  const hasAttachments = Boolean(note.attachFileList?.length);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <section className="rounded-3xl border border-border bg-card shadow-sm transition-colors">
      <div className="space-y-6 p-6">
        <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{note.title}</h2>
          </div>
          <div className="text-sm text-muted-foreground md:text-right">
            <div>
              <span className="font-medium text-foreground">등록일:</span> {formatDate(note.regDate)}
            </div>
            {note.modDate && note.modDate !== note.regDate && (
              <div>
                <span className="font-medium text-foreground">수정일:</span> {formatDate(note.modDate)}
              </div>
            )}
          </div>
        </header>

        {hasAttachments && (
          <div className="space-y-4 rounded-2xl border border-border/60 bg-muted/20 p-4">
            <h3 className="text-sm font-semibold text-foreground">첨부파일</h3>
            <ul className="space-y-2">
              {note.attachFileList.map((attachment) => (
                <li key={attachment.attachFileSeq} className="flex items-center gap-2 text-sm">
                  <a
                    href={`/api/note/download/${note.noteSeq}/${attachment.attachFileSeq}`}
                    className="text-sky-600 hover:underline"
                    download={attachment.fileName}
                  >
                    {attachment.fileName}
                  </a>
                  <span className="text-muted-foreground">
                    ({(attachment.fileSize / 1024).toFixed(1)} KB)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <article className="rounded-3xl bg-muted/40 p-8 text-base leading-relaxed text-foreground whitespace-pre-wrap transition-colors dark:bg-muted/60">
          {note.content}
        </article>
      </div>

      <footer className="flex flex-wrap justify-end gap-2 border-t border-border p-6">
        <Button variant="outline" asChild className="w-full sm:w-28">
          <Link href={listUrl}>목록</Link>
        </Button>
      </footer>
    </section>
  );
}

