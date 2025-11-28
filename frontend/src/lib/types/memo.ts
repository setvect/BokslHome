// 메모 카테고리 응답
export interface MemoCategoryResponse {
  categorySeq: number;
  name: string;
}

// 메모 카테고리 요청
export interface MemoCategoryRequest {
  name: string;
}

// 메모 응답
export interface MemoResponse {
  memoSeq: number;
  categorySeq: number;
  content: string;
  editDate: string;
  regDate: string;
}

// 메모 요청
export interface MemoRequest {
  memoCategorySeq: number;
  content: string;
}
