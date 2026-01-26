import { apiClient } from '../api-client';
import type { CommentModule, CommentPageResponse, CommentRequest, CommentResponse } from '../types/comment';

export async function getCommentPage(params: {
  module: CommentModule;
  moduleId: string;
  page?: number;
  size?: number;
}): Promise<CommentPageResponse> {
  const { module, moduleId, page = 0, size = 10 } = params;

  return apiClient.get<CommentPageResponse>('/api/comments', {
    params: {
      module,
      moduleId,
      page,
      size,
    },
  });
}

export async function createComment(request: CommentRequest, module: CommentModule, moduleId: string): Promise<CommentResponse> {
  return apiClient.post<CommentResponse>('/api/comments', request, {
    params: { module, moduleId },
  });
}

export async function updateComment(commentId: number, request: CommentRequest): Promise<CommentResponse> {
  return apiClient.put<CommentResponse>(`/api/comments/${commentId}`, request);
}

export async function deleteComment(commentId: number): Promise<void> {
  return apiClient.delete<void>(`/api/comments/${commentId}`);
}
