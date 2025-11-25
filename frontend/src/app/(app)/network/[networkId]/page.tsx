import { notFound } from 'next/navigation';

import { RELATIONSHIP_RECORDS, getMockRelationship } from '@/lib/mock/data/network';

import { NetworkDetailView } from '../_components/network-detail-view';

interface NetworkDetailPageProps {
  params: Promise<{
    networkId: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return RELATIONSHIP_RECORDS.map((record) => ({ networkId: record.id }));
}

export default async function NetworkDetailPage({ params }: NetworkDetailPageProps) {
  const { networkId } = await params;
  const record = getMockRelationship(networkId);

  if (!record) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-foreground">관계</h1>
      <NetworkDetailView record={record} />
    </div>
  );
}

