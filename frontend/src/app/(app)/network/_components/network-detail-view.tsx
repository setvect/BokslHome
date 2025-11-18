import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { RelationshipRecord } from '@/lib/types/network';

import { RelationshipGraph } from './relationship-graph';

type NetworkDetailViewProps = {
  record: RelationshipRecord;
};

export function NetworkDetailView({ record }: NetworkDetailViewProps) {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="relationship-title" className="text-sm font-medium text-muted-foreground">
              제목
            </label>
            <Input id="relationship-title" defaultValue={record.title} readOnly className="h-12 text-lg font-semibold" />
          </div>

          <dl className="text-sm text-muted-foreground">
            <div className="flex items-center gap-2 lg:justify-end">
              <dt className="font-medium text-foreground">등록일</dt>
              <dd>{record.createdAt}</dd>
            </div>
            <div className="flex items-center gap-2 lg:justify-end">
              <dt className="font-medium text-foreground">수정일</dt>
              <dd>{record.updatedAt}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <Button asChild variant="secondary">
            <Link href="/network">목록</Link>
          </Button>
          <Button variant="destructive" type="button">
            삭제
          </Button>
        </div>
      </div>

      <div className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
        {record.description ? <p className="text-sm text-muted-foreground">{record.description}</p> : null}
        <RelationshipGraph nodes={record.nodes} edges={record.edges} />
      </div>
    </section>
  );
}

