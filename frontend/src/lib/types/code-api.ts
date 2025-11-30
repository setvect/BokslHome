/**
 * Code API 요청/응답 타입 정의
 * 백엔드 Code API와 매핑되는 타입들
 */

/**
 * Code 생성/수정 요청
 */
export interface CodeRequest {
    majorCode: string;
    minorCode: string;
    codeValue: string;
    orderNo: number;
}

/**
 * Code 응답
 */
export interface CodeResponse {
    codeSeq: number;
    majorCode: string;
    minorCode: string;
    codeValue: string;
    orderNo: number;
}

/**
 * 페이징된 Code 목록 응답
 */
export interface CodePageResponse {
    content: CodeResponse[];
    page: {
        size: number;
        number: number;
        totalElements: number;
        totalPages: number;
    };
}

/**
 * Major Code 그룹 응답
 */
export interface CodeMajorGroupResponse {
    majorCode: string;
    description: string;
}
