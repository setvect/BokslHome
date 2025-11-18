import type { RelationshipCollectionMock, RelationshipRecord } from '@/lib/types/network';

export const RELATIONSHIP_RECORDS: RelationshipRecord[] = [
  {
    id: 'house',
    title: '하우스',
    createdAt: '2023-07-09',
    updatedAt: '2025-02-18',
    nodes: [
      { id: '1', label: '정진', shape: 'ellipse', color: '#ffffcc', x: 3, y: -38 },
      { id: '8kucq.dm57ue', label: '강서원', shape: 'ellipse', color: '#ccff66', x: 81, y: 16 },
      { id: '392g9.498p5k', label: '원우', shape: 'ellipse', color: '#ffffcc', x: 78, y: 95 },
      { id: 'i3ai.lpfp32s', label: '한승우', shape: 'ellipse', color: '#ffffcc', x: 165, y: 44 },
      { id: '5skd9.l7rjj9', label: '벤처사업가', shape: 'box', color: '#ffffff', x: -79, y: -61 },
      { id: '55t1c.jo8ena', label: '혜수', shape: 'ellipse', color: '#ffffcc', x: 166, y: -72 },
      { id: '1aqus.tqrpfb', label: '최인영', shape: 'ellipse', color: '#ffffcc', x: 58, y: -103 },
    ],
    edges: [
      {
        from: '1',
        to: '8kucq.dm57ue',
        label: '부부',
        color: { color: '#777777', highlight: '#777777' },
        id: 'ee7839ef-d76f-4349-8558-e5df96c04d37',
      },
      {
        from: '8kucq.dm57ue',
        to: '392g9.498p5k',
        label: '아들',
        color: { color: '#777777', highlight: '#777777' },
        id: '8763d152-dc5e-48c1-8130-b01ad8224729',
      },
      {
        from: '8kucq.dm57ue',
        to: 'i3ai.lpfp32s',
        label: '불륜',
        color: { color: '#777777', highlight: '#777777' },
        id: '76ac7a2f-1365-45ce-9ae5-5e63c7124973',
      },
      {
        from: '1',
        to: '5skd9.l7rjj9',
        label: '',
        color: { color: '#777777', highlight: '#777777' },
        id: '49bda8e6-4103-409c-b16e-9a742098cb41',
      },
      {
        from: 'i3ai.lpfp32s',
        to: '55t1c.jo8ena',
        label: '친구',
        color: { color: '#777777', highlight: '#777777' },
        id: 'e9f4a97f-2a96-4b72-a275-4e65c15bcd08',
      },
      {
        id: '56fbb.nbfte4',
        from: 'i3ai.lpfp32s',
        to: '392g9.498p5k',
        label: '이빠',
        dashes: false,
        color: { color: '#777777', highlight: '#777777' },
      },
      {
        from: '1',
        to: '1aqus.tqrpfb',
        label: '약혼녀',
        color: { color: '#777777', highlight: '#777777' },
        id: 'd60fb0c8-43dc-4cfd-911f-b7c4e8961438',
      },
      {
        id: '51m1t.1a560g',
        from: '1aqus.tqrpfb',
        to: '55t1c.jo8ena',
        label: '',
        dashes: false,
        color: { color: '#777777', highlight: '#777777' },
      },
      {
        id: '560rt.d5rjmt',
        from: '1',
        to: '55t1c.jo8ena',
        label: '',
        dashes: false,
        color: { color: '#777777', highlight: '#777777' },
      },
    ],
  },
  {
    id: 'copycat',
    title: '모방범',
    createdAt: '2024-05-12',
    updatedAt: '2024-11-03',
    nodes: [
      { id: 'detective', label: '형사', shape: 'ellipse', color: '#fefce8', x: 0, y: 0 },
      { id: 'profiler', label: '프로파일러', shape: 'ellipse', color: '#fefce8', x: 120, y: -60 },
      { id: 'hacker', label: '해커', shape: 'ellipse', color: '#fefce8', x: 120, y: 60 },
      { id: 'copycat', label: '모방범', shape: 'ellipse', color: '#fde68a', x: 240, y: 0 },
      { id: 'media', label: '언론', shape: 'box', color: '#fff', x: -120, y: 0 },
      { id: 'victim', label: '피해자', shape: 'ellipse', color: '#fee2e2', x: 240, y: -100 },
    ],
    edges: [
      { id: 'rel-1', from: 'detective', to: 'profiler', label: '공조', color: { color: '#6b7280' } },
      { id: 'rel-2', from: 'detective', to: 'hacker', label: '제보', color: { color: '#6b7280' } },
      { id: 'rel-3', from: 'profiler', to: 'copycat', label: '심리 분석', color: { color: '#6b7280' } },
      { id: 'rel-4', from: 'hacker', to: 'copycat', label: '추적', color: { color: '#6b7280' } },
      { id: 'rel-5', from: 'media', to: 'detective', label: '압박', color: { color: '#6b7280' }, dashes: true },
      { id: 'rel-6', from: 'copycat', to: 'victim', label: '타깃', color: { color: '#b91c1c' } },
    ],
  },
  {
    id: 'pachinko',
    title: '파친코',
    createdAt: '2022-03-01',
    updatedAt: '2023-09-10',
    nodes: [
      { id: 'sunja', label: '선자', shape: 'ellipse', color: '#fff7ed', x: 0, y: -40 },
      { id: 'hansu', label: '한수', shape: 'ellipse', color: '#fff7ed', x: 120, y: -100 },
      { id: 'baek', label: '백이삭', shape: 'ellipse', color: '#e0f2fe', x: -120, y: -100 },
      { id: 'noa', label: '노아', shape: 'ellipse', color: '#e2e8f0', x: -60, y: 60 },
      { id: 'mosazu', label: '모자수', shape: 'ellipse', color: '#f0fdf4', x: 80, y: 60 },
      { id: 'solomon', label: '솔로몬', shape: 'ellipse', color: '#fef9c3', x: 0, y: 140 },
    ],
    edges: [
      { id: 'p-rel-1', from: 'sunja', to: 'baek', label: '부부', color: { color: '#6b7280' } },
      { id: 'p-rel-2', from: 'sunja', to: 'hansu', label: '과거 인연', color: { color: '#6b7280' }, dashes: true },
      { id: 'p-rel-3', from: 'sunja', to: 'noa', label: '모자', color: { color: '#6b7280' } },
      { id: 'p-rel-4', from: 'sunja', to: 'mosazu', label: '모자', color: { color: '#6b7280' } },
      { id: 'p-rel-5', from: 'noa', to: 'solomon', label: '사촌', color: { color: '#6b7280' }, dashes: true },
      { id: 'p-rel-6', from: 'mosazu', to: 'solomon', label: '부자', color: { color: '#6b7280' } },
    ],
  },
];

export function getMockRelationshipList(): RelationshipCollectionMock {
  return { records: RELATIONSHIP_RECORDS };
}

export function getMockRelationship(id: string): RelationshipRecord | undefined {
  return RELATIONSHIP_RECORDS.find((record) => record.id === id);
}

