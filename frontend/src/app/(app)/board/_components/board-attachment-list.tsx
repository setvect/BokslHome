import Link from 'next/link';

import { Download, Paperclip } from 'lucide-react';

import type { BoardAttachmentMock } from '@/lib/types/board';

type BoardAttachmentListProps = {
  attachments?: BoardAttachmentMock[];
  showDownload?: boolean;
};

export function BoardAttachmentList({ attachments, showDownload = false }: BoardAttachmentListProps) {
  if (!attachments?.length) {
    return null;
  }

  return (
    <div className="space-y-2 rounded-2xl border border-border bg-muted/40 p-4 transition-colors dark:bg-muted/60">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Paperclip className="h-4 w-4" />
        첨부파일
      </div>
      <ul className="space-y-1 text-sm text-muted-foreground">
        {attachments.map((file) => (
          <li key={file.id} className="flex items-center justify-between rounded-md bg-card px-3 py-2 shadow-sm">
            <span>{file.filename}</span>
            <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
              <span>{formatSize(file.size)}</span>
              {showDownload ? (
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <Download className="h-3 w-3" /> 다운로드
                </Link>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatSize(size: number) {
  if (size >= 1_048_576) {
    return `${(size / 1_048_576).toFixed(1)} MB`;
  }
  if (size >= 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }
  return `${size} B`;
}
