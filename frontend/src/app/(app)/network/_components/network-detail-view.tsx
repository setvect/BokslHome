'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateNetwork } from '@/lib/api/network-api-client';
import type { NetworkResponse } from '@/lib/types/network-api';
import type { RelationshipEdgeData, RelationshipNodeData } from '@/lib/types/network';

import { NetworkEditor } from './network-editor';

type NetworkDetailViewProps = {
  network: NetworkResponse;
};

export function NetworkDetailView({ network }: NetworkDetailViewProps) {
  const router = useRouter();
  const [title, setTitle] = useState(network.title);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Parse content JSON to get nodes and edges
  const graphData = parseGraphData(network.content);

  const handleSave = async (updatedGraphData: { nodes: RelationshipNodeData[]; edges: RelationshipEdgeData[] }) => {
    try {
      setIsSaving(true);
      setSaveError(null);

      // Convert graph data back to JSON string
      const content = JSON.stringify(updatedGraphData);

      await updateNetwork(network.networkSeq, {
        title,
        content,
      });

      // Refresh the page or show success message
      router.refresh();
    } catch (err) {
      console.error('Failed to save network:', err);
      setSaveError(err instanceof Error ? err.message : '저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <section className="space-y-3">
      {saveError && (
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {saveError}
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card p-3 shadow-sm md:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex-1">
            <label htmlFor="relationship-title" className="sr-only">
              제목
            </label>
            <Input
              id="relationship-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 rounded-xl border-border/70 bg-background/70 text-base font-semibold md:h-10"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:gap-6">
            <dl className="flex gap-4 text-xs text-muted-foreground md:text-sm">
              <div className="flex items-center gap-1">
                <dt className="font-medium text-foreground">등록일</dt>
                <dd>{formatDate(network.regDate)}</dd>
              </div>
              <div className="flex items-center gap-1">
                <dt className="font-medium text-foreground">수정일</dt>
                <dd>{formatDate(network.editDate)}</dd>
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

      <NetworkEditor
        initialNodes={graphData.nodes}
        initialEdges={graphData.edges}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </section>
  );
}

// Helper function to parse graph data from content JSON
function parseGraphData(content: string): { nodes: RelationshipNodeData[]; edges: RelationshipEdgeData[] } {
  try {
    const parsed = JSON.parse(content);
    return {
      nodes: parsed.nodes || [],
      edges: parsed.edges || [],
    };
  } catch (err) {
    console.error('Failed to parse graph data:', err);
    return { nodes: [], edges: [] };
  }
}
