/**
 * Board Management API Types
 * TypeScript types for board management API requests and responses
 */

/**
 * Board Manager Response
 * Matches backend BoardManagerResponse
 */
export interface BoardManagerResponse {
    boardCode: string;
    name: string;
    uploadLimit: number;
    replyF: boolean;
    commentF: boolean;
    attachF: boolean;
    encryptF: boolean;
    deleteF: boolean;
}

/**
 * Board Manager Request
 * For create and update operations
 */
export interface BoardManagerRequest {
    boardCode: string;
    name: string;
    uploadLimit: number;
    replyF: boolean;
    commentF: boolean;
    attachF: boolean;
    encryptF: boolean;
    deleteF: boolean;
}

/**
 * Board Manager Search Request
 * Search parameters for filtering boards
 */
export interface BoardManagerSearchRequest {
    boardCode?: string;
    name?: string;
}

/**
 * Board Manager Page Response
 * Paginated response wrapper
 */
export interface BoardManagerPageResponse {
    content: BoardManagerResponse[];
    page: {
        size: number;
        number: number;
        totalElements: number;
        totalPages: number;
    };
}
