/**
 * Board Article API Client
 * Functions for communicating with the backend Board Article API
 */

import { apiClient, API_BASE_URL } from '../api-client';
import type { BoardArticleRequest, BoardArticleResponse, BoardArticlePageResponse, SearchType } from '../types/board-article-api';

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
export async function getBoardArticle(boardArticleSeq: number, decryptKey?: string): Promise<BoardArticleResponse> {
  return apiClient.get<BoardArticleResponse>(`/api/board-article/${boardArticleSeq}`, {
    params: decryptKey ? { decryptKey } : undefined,
  });
}

/**
 * Create a new board article with optional file attachments
 */
export async function createBoardArticle(request: BoardArticleRequest, attachFiles?: File[]): Promise<BoardArticleResponse> {
  const formData = new FormData();

  // Add request as JSON blob
  formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));

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
  formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));

  // Add attachment files
  if (attachFiles && attachFiles.length > 0) {
    attachFiles.forEach((file) => {
      formData.append('attachFileList', file);
    });
  }

  return apiClient.put<BoardArticleResponse>(`/api/board-article/${boardArticleSeq}`, formData);
}

/**
 * Delete a board article
 */
export async function deleteBoardArticle(boardArticleSeq: number): Promise<void> {
  return apiClient.delete<void>(`/api/board-article/${boardArticleSeq}`);
}

/**
 * Download an attachment file with authentication
 * This function handles the download with proper authentication headers
 */
export async function downloadAttachment(boardArticleSeq: number, attachFileSeq: number, fileName: string): Promise<void> {
  const url = `${API_BASE_URL}/api/board-article/download/${boardArticleSeq}/${attachFileSeq}`;

  // Auth via HttpOnly cookie
  const token: string | null = null;

  console.log('🔑 Download Token:', token ? 'Token exists' : 'No token');
  console.log('📥 Download URL:', url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    console.log('📡 Response Status:', response.status);
    console.log('📡 Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`);
    }

    // Get the blob from response
    const blob = await response.blob();

    // Create a temporary URL for the blob
    const blobUrl = window.URL.createObjectURL(blob);

    // Create a temporary anchor element and trigger download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Failed to download file:', error);
    throw error;
  }
}

/**
 * Get download URL for attachment (deprecated - use downloadAttachment instead)
 * @deprecated Use downloadAttachment function for authenticated downloads
 */
export function getAttachmentDownloadUrl(boardArticleSeq: number, attachFileSeq: number): string {
  return `${API_BASE_URL}/api/board-article/download/${boardArticleSeq}/${attachFileSeq}`;
}
