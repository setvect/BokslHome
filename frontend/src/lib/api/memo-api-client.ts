/**
 * Memo API 클라이언트
 * 백엔드 Memo API와 통신하는 함수들
 */

import { apiClient } from '../api-client';
import type { MemoRequest, MemoResponse, MemoPageResponse, MemoSearchParams } from '../types/memo';

/**
 * 메모 페이징 조회
 */
export async function getMemoPage(params: MemoSearchParams): Promise<MemoPageResponse> {
  const { categorySeq, word, page = 0, size = 10 } = params;

  return apiClient.get<MemoPageResponse>('/api/memo', {
    params: {
      categorySeq,
      word,
      page,
      size,
    },
  });
}

/**
 * 특정 메모 조회
 */
export async function getMemo(memoSeq: number): Promise<MemoResponse> {
  return apiClient.get<MemoResponse>(`/api/memo/${memoSeq}`);
}

/**
 * 메모 생성
 */
export async function createMemo(request: MemoRequest): Promise<MemoResponse> {
  return apiClient.post<MemoResponse>('/api/memo', request);
}

/**
 * 메모 수정
 */
export async function updateMemo(memoSeq: number, request: MemoRequest): Promise<MemoResponse> {
  return apiClient.put<MemoResponse>(`/api/memo/${memoSeq}`, request);
}

/**
 * 메모 삭제
 */
export async function deleteMemo(memoSeq: number): Promise<void> {
  return apiClient.delete<void>(`/api/memo/${memoSeq}`);
}
