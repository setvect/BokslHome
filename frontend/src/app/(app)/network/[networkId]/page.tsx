'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getNetwork } from '@/lib/api/network-api-client';
import type { NetworkResponse } from '@/lib/types/network-api';

import { NetworkDetailView } from '../_components/network-detail-view';

export default function NetworkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const networkId = params.networkId as string;

  const [network, setNetwork] = useState<NetworkResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNetwork = async () => {
      try {
        setIsLoading(true);
        const data = await getNetwork(parseInt(networkId, 10));
        setNetwork(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch network:', err);
        setError(err instanceof Error ? err.message : '네트워크 데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNetwork();
  }, [networkId]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold text-foreground">관계</h1>
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
          로딩 중...
        </div>
      </div>
    );
  }

  if (error || !network) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold text-foreground">관계</h1>
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error || '네트워크를 찾을 수 없습니다.'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-foreground">관계</h1>
      <NetworkDetailView network={network} />
    </div>
  );
}
