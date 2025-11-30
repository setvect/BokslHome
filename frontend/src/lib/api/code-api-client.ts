/**
 * Code API 클라이언트
 * 백엔드 Code API와 통신하는 함수들
 */

import { apiClient } from '../api-client';
import type { CodeRequest, CodeResponse, PagedResponse, CodeMajorGroupResponse } from '../types/code';

/**
 * Code 생성
 */
export async function createCode(request: CodeRequest): Promise<CodeResponse> {
    return apiClient.post<CodeResponse>('/api/code', request);
}

/**
 * Code 수정
 */
export async function updateCode(
    codeSeq: number,
    request: CodeRequest
): Promise<CodeResponse> {
    return apiClient.put<CodeResponse>(`/api/code/${codeSeq}`, request);
}

/**
 * Code 삭제
 */
export async function deleteCode(codeSeq: number): Promise<void> {
    return apiClient.delete<void>(`/api/code/${codeSeq}`);
}

/**
 * 특정 Code 조회
 */
export async function getCode(codeSeq: number): Promise<CodeResponse> {
    return apiClient.get<CodeResponse>(`/api/code/${codeSeq}`);
}

/**
 * Code 목록 페이징 조회
 */
export async function getCodePage(params: {
    majorCode?: string;
    page?: number;
    size?: number;
    sort?: string;
}): Promise<PagedResponse<CodeResponse>> {
    const { majorCode, page = 0, size = 100, sort } = params;

    return apiClient.get<PagedResponse<CodeResponse>>('/api/code/page', {
        params: {
            majorCode,
            page,
            size,
            sort,
        },
    });
}

/**
 * Major Code 그룹 목록 조회
 */
export async function getMajorCodes(): Promise<CodeMajorGroupResponse[]> {
    return apiClient.get<CodeMajorGroupResponse[]>('/api/code/majorCode');
}
