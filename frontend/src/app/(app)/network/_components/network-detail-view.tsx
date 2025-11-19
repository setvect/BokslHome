import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { RelationshipRecord } from '@/lib/types/network';

import { NetworkEditor } from './network-editor';

type NetworkDetailViewProps = {
  record: RelationshipRecord;
};

export function NetworkDetailView({ record }: NetworkDetailViewProps) {
  return (
    <section className="space-y-3">
      <div className="rounded-2xl border border-border bg-card p-3 shadow-sm md:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex-1">
            <label htmlFor="relationship-title" className="sr-only">
              제목
            </label>
            <Input
              id="relationship-title"
              defaultValue={record.title}
              readOnly
              className="h-11 rounded-xl border-border/70 bg-background/70 text-base font-semibold md:h-10"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:gap-6">
            <dl className="flex gap-4 text-xs text-muted-foreground md:text-sm">
              <div className="flex items-center gap-1">
                <dt className="font-medium text-foreground">등록일</dt>
                <dd>{record.createdAt}</dd>
              </div>
              <div className="flex items-center gap-1">
                <dt className="font-medium text-foreground">수정일</dt>
                <dd>{record.updatedAt}</dd>
              </div>
            </dl>

            <div className="flex items-center gap-2">
              <Button asChild variant="secondary" className="h-10 px-4">
                <Link href="/network">목록</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <NetworkEditor record={record} />
    </section>
  );
}

