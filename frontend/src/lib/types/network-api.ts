/**
 * Network API 요청/응답 타입 정의
 * 백엔드 API와 매핑되는 타입들
 */

/**
 * Network 생성/수정 요청
 */
export interface NetworkRequest {
    title: string;
    content: string;
}

/**
 * Network 응답
 */
export interface NetworkResponse {
    networkSeq: number;
    title: string;
    content: string;
    regDate: string; // ISO 8601 format
    editDate: string; // ISO 8601 format
}

/**
 * 페이징된 Network 목록 응답
 */
export interface NetworkPageResponse {
    content: NetworkResponse[];
    page: {
        size: number;
        number: number;
        totalElements: number;
        totalPages: number;
    };
}
