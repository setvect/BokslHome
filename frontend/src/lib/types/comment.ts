export type CommentModule = 'MAIN' | 'BOARD' | 'NOTE' | 'KNOWLEDGE';

export interface CommentResponse {
  commentSeq: number;
  content: string;
  regDate: string;
  name: string;
}

export interface CommentRequest {
  content: string;
}

export interface CommentPageResponse {
  content: CommentResponse[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}
