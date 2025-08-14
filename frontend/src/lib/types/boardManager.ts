/**
 * 게시판 관리 모듈 타입 정의
 * TBBA_BOARD_MANAGER 테이블 기반
 */

// 게시판 관리자 정보 인터페이스
export interface BoardManager {
  boardCode: string;     // BOARD_CODE (PK) - 게시판 코드 (예: BDMAIN01)
  name: string;          // NAME - 게시판 이름
  uploadLimit: number;   // UPLOAD_LIMIT - 업로드 제한 (Kbyte, 0이면 제한 없음)
  replyF: boolean;       // REPLY_F - 답변 여부 (DB: Y/N → boolean)
  commentF: boolean;     // COMMENT_F - 댓글 여부 (DB: Y/N → boolean)
  attachF: boolean;      // ATTACH_F - 첨부파일 여부 (DB: Y/N → boolean)
  encryptF: boolean;     // ENCRYPT_F - 암호화 사용여부 (DB: Y/N → boolean)
  deleteF: boolean;      // DELETE_F - 삭제여부 (DB: Y/N → boolean)
}

// 게시판 생성/수정을 위한 폼 데이터 타입
export interface BoardManagerFormData {
  boardCode: string;
  name: string;
  uploadLimit: number;
  replyF: boolean;
  commentF: boolean;
  attachF: boolean;
  encryptF: boolean;
}

// 검색 조건 타입
export interface BoardManagerSearchFilter {
  searchType: 'name' | 'boardCode';  // 검색 유형 (이름 또는 코드)
  searchKeyword: string;             // 검색 키워드
}

// 페이지네이션 타입
export interface Pagination {
  currentPage: number;    // 현재 페이지 (1부터 시작)
  pageSize: number;       // 페이지당 항목 수
  totalItems: number;     // 전체 항목 수
  totalPages: number;     // 전체 페이지 수
}

// API 응답용 페이지네이션 포함 리스트 타입
export interface BoardManagerListResponse {
  items: BoardManager[];
  pagination: Pagination;
}

// 폼 검증 에러 타입
export interface BoardManagerValidationErrors {
  boardCode?: string;
  name?: string;
  uploadLimit?: string;
}

// 폼 검증 결과 타입
export interface ValidationResult {
  isValid: boolean;
  errors: BoardManagerValidationErrors;
}

// API 요청/응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

// 정렬 옵션 타입
export interface SortOption {
  field: keyof BoardManager;
  direction: 'asc' | 'desc';
}

// 검색 및 정렬을 포함한 쿼리 타입
export interface BoardManagerQuery {
  search?: BoardManagerSearchFilter;
  pagination: Pick<Pagination, 'currentPage' | 'pageSize'>;
  sort?: SortOption;
}

// DB Y/N ↔ boolean 변환 유틸리티 타입
export type YNBoolean = 'Y' | 'N';

// DB 응답용 게시판 관리자 정보 (백엔드에서 받는 형태)
export interface BoardManagerDbResponse {
  boardCode: string;
  name: string;
  uploadLimit: number;
  replyF: YNBoolean;
  commentF: YNBoolean;
  attachF: YNBoolean;
  encryptF: YNBoolean;
  deleteF: YNBoolean;
}

// 상수 정의
export const BOARD_MANAGER_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_UPLOAD_LIMIT: 10240, // 10MB in KB
  SEARCH_TYPES: [
    { value: 'name', label: '이름' },
    { value: 'boardCode', label: '코드' }
  ] as const
} as const;

// 게시판 기능 옵션 라벨
export const BOARD_FEATURE_LABELS = {
  replyF: '댓글 사용',
  commentF: '파일 업로드', 
  attachF: '암호화 글 등록',
  encryptF: '암호화 사용',
  deleteF: '삭제 가능'
} as const;