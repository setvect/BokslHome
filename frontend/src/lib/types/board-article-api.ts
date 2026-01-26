/**
 * Board Article API Types
 * TypeScript types for board article API requests and responses
 */

/**
 * Search type for board article search
 */
export type SearchType = 'TITLE' | 'CONTENT';

/**
 * Content type for board article
 */
export type ContentType = 'HTML' | 'MARKDOWN';

/**
 * Attachment file information
 */
export interface AttachFileInfo {
  attachFileSeq: number;
  originalName: string;
  size: number;
}

/**
 * Board Article Response
 * Matches backend BoardArticleResponse
 */
export interface BoardArticleResponse {
  boardArticleSeq: number;
  boardCode: string;
  title: string;
  content: string;
  contentType: ContentType;
  encryptF: boolean;
  regDate: string;
  editDate: string;
  deleteF: boolean;
  attachFileList: AttachFileInfo[];
}

/**
 * Board Article Request
 * For create and update operations
 */
export interface BoardArticleRequest {
  boardCode?: string; // Required for create, not for update
  title: string;
  content: string;
  contentType: ContentType;
  encryptF: boolean;
  password?: string; // For encrypted posts
  deleteAttachFileSeqList?: number[]; // For update: list of attachment IDs to delete
}

/**
 * Board Article Page Response
 * Paginated response wrapper
 */
export interface BoardArticlePageResponse {
  content: BoardArticleResponse[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}
