/**
 * Note API 클라이언트
 * 백엔드 Note API와 통신하는 함수들
 */

import { apiClient } from '../api-client';
import type { NoteResponse, NotePageResponse, NoteCategoryResponse, TreeNode, NoteCategoryTreeData } from '../types/note-api';

/**
 * 특정 노트 조회
 */
export async function getNote(noteSeq: number): Promise<NoteResponse> {
  return apiClient.get<NoteResponse>(`/api/note/${noteSeq}`);
}

/**
 * 노트 목록 페이징 조회
 */
export async function getNotePage(params: {
  noteCategorySeq?: number;
  title?: string;
  content?: string;
  page?: number;
  size?: number;
}): Promise<NotePageResponse> {
  const { noteCategorySeq, title, content, page = 0, size = 10 } = params;

  return apiClient.get<NotePageResponse>('/api/note/page', {
    params: {
      noteCategorySeq,
      title,
      content,
      page,
      size,
    },
  });
}

/**
 * 노트 카테고리 목록 조회
 */
export async function getNoteCategories(): Promise<NoteCategoryResponse[]> {
  return apiClient.get<NoteCategoryResponse[]>('/api/note-category');
}

/**
 * 노트 카테고리 트리 조회
 */
export async function getNoteCategoryTree(): Promise<TreeNode<NoteCategoryTreeData>[]> {
  return apiClient.get<TreeNode<NoteCategoryTreeData>[]>('/api/note-category/tree');
}
