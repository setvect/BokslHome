/**
 * Network API 클라이언트
 * 백엔드 Network API와 통신하는 함수들
 */

import { apiClient } from '../api-client';
import type { NetworkRequest, NetworkResponse, NetworkPageResponse } from '../types/network-api';

/**
 * Network 생성
 */
export async function createNetwork(request: NetworkRequest): Promise<NetworkResponse> {
    return apiClient.post<NetworkResponse>('/api/network', request);
}

/**
 * Network 수정
 */
export async function updateNetwork(
    networkSeq: number,
    request: NetworkRequest
): Promise<NetworkResponse> {
    return apiClient.put<NetworkResponse>(`/api/network/${networkSeq}`, request);
}

/**
 * Network 삭제
 */
export async function deleteNetwork(networkSeq: number): Promise<void> {
    return apiClient.delete<void>(`/api/network/${networkSeq}`);
}

/**
 * 특정 Network 조회
 */
export async function getNetwork(networkSeq: number): Promise<NetworkResponse> {
    return apiClient.get<NetworkResponse>(`/api/network/${networkSeq}`);
}

/**
 * Network 목록 페이징 조회
 */
export async function getNetworkPage(params: {
    title?: string;
    page?: number;
    size?: number;
}): Promise<NetworkPageResponse> {
    const { title, page = 0, size = 10 } = params;

    return apiClient.get<NetworkPageResponse>('/api/network/page', {
        params: {
            title,
            page,
            size,
        },
    });
}
