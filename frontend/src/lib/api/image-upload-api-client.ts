import { apiClient } from '../api-client';

export interface ImageUploadResponse {
  attachFileSeq: number;
  url: string;
  originalName: string;
}

export async function uploadImageFile(file: File): Promise<ImageUploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  return apiClient.post<ImageUploadResponse>('/api/image/upload', formData);
}

export function buildImageUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
  if (url.startsWith('/')) {
    return `${baseUrl}${url}`;
  }

  return `${baseUrl}/${url}`;
}
