/**
 * Board Management API Client
 * Functions for communicating with the backend Board Manager API
 */

import { apiClient } from '../api-client';
import type { BoardManagerRequest, BoardManagerResponse, BoardManagerPageResponse } from '../types/board-manage-api';

/**
 * Create a new board
 */
export async function createBoardManager(request: BoardManagerRequest): Promise<BoardManagerResponse> {
  return apiClient.post<BoardManagerResponse>('/api/board-manager', request);
}

/**
 * Update an existing board
 */
export async function updateBoardManager(boardCode: string, request: BoardManagerRequest): Promise<BoardManagerResponse> {
  return apiClient.put<BoardManagerResponse>(`/api/board-manager/${boardCode}`, request);
}

/**
 * Delete a board
 */
export async function deleteBoardManager(boardCode: string): Promise<void> {
  return apiClient.delete<void>(`/api/board-manager/${boardCode}`);
}

/**
 * Get a specific board by code
 */
export async function getBoardManager(boardCode: string): Promise<BoardManagerResponse> {
  return apiClient.get<BoardManagerResponse>(`/api/board-manager/${boardCode}`);
}

/**
 * Get paginated list of boards with optional search
 */
export async function getBoardManagerPage(params: {
  boardCode?: string;
  name?: string;
  page?: number;
  size?: number;
}): Promise<BoardManagerPageResponse> {
  const { boardCode, name, page = 0, size = 10 } = params;

  return apiClient.get<BoardManagerPageResponse>('/api/board-manager/page', {
    params: {
      boardCode,
      name,
      page,
      size,
    },
  });
}
