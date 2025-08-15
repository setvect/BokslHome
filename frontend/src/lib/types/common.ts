/**
 * 공통 타입 정의
 * 프로젝트 전체에서 재사용되는 범용 타입들
 */

// 페이지네이션 타입
export interface Pagination {
  currentPage: number; // 현재 페이지 (1부터 시작)
  pageSize: number; // 페이지당 항목 수
  totalItems: number; // 전체 항목 수
  totalPages: number; // 전체 페이지 수
}

// API 에러 응답 타입 (HTTP 4xx, 5xx 상태 코드와 함께 전달)
export interface ApiErrorResponse {
  timestamp: string; // ISO 형식 타임스탬프
  status: number; // HTTP 상태 코드
  error: string; // 에러 타입 (예: "Not Found", "Internal Server Error")
  message: string; // 사용자 친화적 에러 메시지
  path: string; // 요청 경로
}

// 페이지네이션 포함 리스트 응답의 제네릭 타입
export interface PagedListResponse<T> {
  items: T[];
  pagination: Pagination;
}

// 검색 필터 기본 인터페이스
export interface BaseSearchFilter {
  searchType: string;
  searchKeyword: string;
}

// 쿼리 파라미터 기본 인터페이스
export interface BaseQuery {
  pagination: Pick<Pagination, 'currentPage' | 'pageSize'>;
}

// 공통 상수
export const COMMON_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  FIRST_PAGE: 1
} as const;
