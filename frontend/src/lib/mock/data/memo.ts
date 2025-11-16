import type { MemoCollectionMock, MemoItem } from '@/lib/types/memo';

export const MEMO_ITEMS: MemoItem[] = [
  {
    id: 46,
    category: '공부',
    content: 'Intellij Plugin - GsonFormat Plugin',
    createdAt: '2022-07-16',
    updatedAt: '2022-07-16',
  },
  {
    id: 45,
    category: '공부',
    content: 'https://lazyquant.xyz/allocation/vaa',
    createdAt: '2022-04-15',
    updatedAt: '2022-04-15',
  },
  {
    id: 44,
    category: '공부',
    content: 'entity를 비지니스 로직에 활용하는 것을 신중하게 하자. DB 데이터 구조와 로직간의 결합이 높게 된다.',
    createdAt: '2022-03-20',
    updatedAt: '2022-03-20',
  },
  {
    id: 43,
    category: '공부',
    content: '자동매매 수수료 https://systemscalping.tistory.com/7',
    createdAt: '2022-03-13',
    updatedAt: '2022-03-13',
  },
  {
    id: 42,
    category: '공부',
    content: '함께 자라기 : 애자일로 가는 길 https://www.inflearn.com/course/%EC%8A%A4%EB%A7%81-%ED%95%B5%EC%8B%AC%EB%94%94%EC%9E%90%EC%9D%B8-%EC%BD%94%EC%B9%98',
    createdAt: '2021-11-30',
    updatedAt: '2021-11-30',
  },
  {
    id: 41,
    category: '공부',
    content: 'https://jojoldu.tistory.com/517',
    createdAt: '2021-09-24',
    updatedAt: '2021-09-24',
  },
  {
    id: 40,
    category: '공부',
    content: `책 - 파이썬 증권 데이터 분석
- 연평균 성장률(연복리 수익률) - CAGR
- https://github.com/INVESTAR/StockAnalysisInPython
- with ~ as 자바에서 try()`,
    createdAt: '2021-06-20',
    updatedAt: '2021-06-20',
  },
];

export function getMockMemoCollection(): MemoCollectionMock {
  return { items: MEMO_ITEMS };
}

export function getMemoCategories(): string[] {
  return Array.from(new Set(MEMO_ITEMS.map((item) => item.category)));
}

export function getMockMemoItem(id: number): MemoItem | undefined {
  return MEMO_ITEMS.find((item) => item.id === id);
}

