import { getMockRelationshipList } from '@/lib/mock/data/network';

import { NetworkListView } from './_components/network-list-view';

export default function NetworkPage() {
  const { records } = getMockRelationshipList();
  return <NetworkListView records={records} />;
}
