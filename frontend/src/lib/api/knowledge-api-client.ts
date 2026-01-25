/**
 * Knowledge API 클라이언트
 * 백엔드 Knowledge API와 통신하는 함수들
 */

import { apiClient } from '../api-client';
import type { KnowledgeRequest, KnowledgeResponse, KnowledgePageResponse } from '../types/knowledge-api';

/**
 * Knowledge 생성
 */
export async function createKnowledge(request: KnowledgeRequest): Promise<KnowledgeResponse> {
  return apiClient.post<KnowledgeResponse>('/api/knowledge', request);
}

/**
 * Knowledge 수정
 */
export async function updateKnowledge(knowledgeSeq: number, request: KnowledgeRequest): Promise<KnowledgeResponse> {
  return apiClient.put<KnowledgeResponse>(`/api/knowledge/${knowledgeSeq}`, request);
}

/**
 * Knowledge 삭제
 */
export async function deleteKnowledge(knowledgeSeq: number): Promise<void> {
  return apiClient.delete<void>(`/api/knowledge/${knowledgeSeq}`);
}

/**
 * 특정 Knowledge 조회
 */
export async function getKnowledge(knowledgeSeq: number): Promise<KnowledgeResponse> {
  return apiClient.get<KnowledgeResponse>(`/api/knowledge/${knowledgeSeq}`);
}

/**
 * Knowledge 목록 페이징 조회
 */
export async function getKnowledgePage(params: {
  classifyC?: string;
  content?: string;
  page?: number;
  size?: number;
}): Promise<KnowledgePageResponse> {
  const { classifyC, content, page = 0, size = 10 } = params;

  return apiClient.get<KnowledgePageResponse>('/api/knowledge/page', {
    params: {
      classifyC,
      content,
      page,
      size,
    },
  });
}
