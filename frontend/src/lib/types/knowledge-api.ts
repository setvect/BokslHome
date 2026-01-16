/**
 * Knowledge API 요청/응답 타입 정의
 * 백엔드 API와 매핑되는 타입들
 */

/**
 * Knowledge 생성/수정 요청
 */
export interface KnowledgeRequest {
    classifyC: string;
    problem: string;
    solution?: string;
}

/**
 * Knowledge 응답
 */
export interface KnowledgeResponse {
    knowledgeSeq: number;
    classifyC: string;
    problem: string;
    solution: string | null;
    regDate: string; // ISO 8601 format
}

/**
 * 페이징된 Knowledge 목록 응답
 */
export interface KnowledgePageResponse {
    content: KnowledgeResponse[];
    page: {
        size: number;
        number: number;
        totalElements: number;
        totalPages: number;
    };
}
