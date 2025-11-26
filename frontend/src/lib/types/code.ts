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

