/**
 * Board Article API Client
 * Functions for communicating with the backend Board Article API
 */

import { apiClient } from '../api-client';
import type {
  BoardArticleRequest,
  BoardArticleResponse,
  BoardArticlePageResponse,
  SearchType,
} from '../types/board-article-api';

/**
 * Get paginated list of board articles with optional search
 */
export async function getBoardArticlePage(params: {
  boardCode: string;
  searchType?: SearchType;
  word?: string;
  page?: number;
  size?: number;
}): Promise<BoardArticlePageResponse> {
  const { boardCode, searchType, word, page = 0, size = 10 } = params;

  return apiClient.get<BoardArticlePageResponse>('/api/board-article/page', {
    params: {
      boardCode,
      searchType,
      word,
      page,
      size,
    },
  });
}

/**
 * Get a specific board article by ID
 * @param boardArticleSeq - Article ID
 * @param decryptKey - Optional decryption key for encrypted articles
 */
export async function getBoardArticle(
  boardArticleSeq: number,
  decryptKey?: string
): Promise<BoardArticleResponse> {
  return apiClient.get<BoardArticleResponse>(`/api/board-article/${boardArticleSeq}`, {
    params: decryptKey ? { decryptKey } : undefined,
  });
}

/**
 * Create a new board article with optional file attachments
 */
export async function createBoardArticle(
  request: BoardArticleRequest,
  attachFiles?: File[]
): Promise<BoardArticleResponse> {
  const formData = new FormData();

  // Add request as JSON blob
  formData.append(
    'request',
    new Blob([JSON.stringify(request)], { type: 'application/json' })
  );

  // Add attachment files
  if (attachFiles && attachFiles.length > 0) {
    attachFiles.forEach((file) => {
      formData.append('attachFileList', file);
    });
  }

  return apiClient.post<BoardArticleResponse>('/api/board-article', formData);
}

/**
 * Update an existing board article with optional file attachments
 */
export async function updateBoardArticle(
  boardArticleSeq: number,
  request: BoardArticleRequest,
  attachFiles?: File[]
): Promise<BoardArticleResponse> {
  const formData = new FormData();

  // Add request as JSON blob
  formData.append(
    'request',
    new Blob([JSON.stringify(request)], { type: 'application/json' })
  );

  // Add attachment files
  if (attachFiles && attachFiles.length > 0) {
    attachFiles.forEach((file) => {
      formData.append('attachFileList', file);
    });
  }

  return apiClient.put<BoardArticleResponse>(
    `/api/board-article/${boardArticleSeq}`,
    formData
  );
}

/**
 * Delete a board article
 */
export async function deleteBoardArticle(boardArticleSeq: number): Promise<void> {
  return apiClient.delete<void>(`/api/board-article/${boardArticleSeq}`);
}

/**
 * Download an attachment file
 * Returns the download URL for the file
 */
export function getAttachmentDownloadUrl(boardArticleSeq: number, attachFileSeq: number): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
  return `${baseUrl}/api/board-article/download/${boardArticleSeq}/${attachFileSeq}`;
}
