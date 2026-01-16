'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createNetwork } from '@/lib/api/network-api-client';
import type { RelationshipEdgeData, RelationshipNodeData } from '@/lib/types/network';

import { NetworkEditor } from '../_components/network-editor';

export default function NetworkCreatePage() {
    const router = useRouter();
    const [title, setTitle] = useState('새 관계도');
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    // Initial empty graph data
    const initialNodes: RelationshipNodeData[] = [];
    const initialEdges: RelationshipEdgeData[] = [];

    const handleSave = async (graphData: { nodes: RelationshipNodeData[]; edges: RelationshipEdgeData[] }) => {
        try {
            setIsSaving(true);
            setSaveError(null);

            // Convert graph data to JSON string
            const content = JSON.stringify(graphData);

            const newNetwork = await createNetwork({
                title,
                content,
            });

            // Navigate to the newly created network detail page
            router.push(`/network/${newNetwork.networkSeq}`);
        } catch (err) {
            console.error('Failed to create network:', err);
            setSaveError(err instanceof Error ? err.message : '생성에 실패했습니다.');
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold text-foreground">관계 만들기</h1>

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
                                placeholder="관계도 제목을 입력하세요"
                                className="h-11 rounded-xl border-border/70 bg-background/70 text-base font-semibold md:h-10"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Button asChild variant="secondary" className="h-10 px-4">
                                <Link href="/network">취소</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <NetworkEditor
                    initialNodes={initialNodes}
                    initialEdges={initialEdges}
                    onSave={handleSave}
                    isSaving={isSaving}
                />
            </section>
        </div>
    );
}
