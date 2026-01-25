// 메모 카테고리 응답
export interface MemoCategoryResponse {
  categorySeq: number;
  name: string;
  memoCount: number;
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

// 메모 페이징 응답
export interface MemoPageResponse {
  content: MemoResponse[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

// 메모 검색 파라미터
export interface MemoSearchParams {
  categorySeq?: number;
  word?: string;
  page?: number;
  size?: number;
}
