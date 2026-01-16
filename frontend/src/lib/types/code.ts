// 코드 관련 타입 정의

export interface CodeResponse {
  codeSeq: number;
  majorCode: string;
  minorCode: string;
  codeValue: string;
  orderNo: number;
}

export interface CodeRequest {
  majorCode: string;
  minorCode: string;
  codeValue: string;
  orderNo: number;
}

export interface CodeMajorGroupResponse {
  majorCode: string;
  count: number;
  description?: string; // 선택적 필드로 추가 (백엔드 응답에 따라 포함될 수 있음)
}

export interface PagedResponse<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

