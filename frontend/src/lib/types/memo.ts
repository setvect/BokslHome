export interface MemoItem {
  id: number;
  category: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface MemoCollectionMock {
  items: MemoItem[];
}

