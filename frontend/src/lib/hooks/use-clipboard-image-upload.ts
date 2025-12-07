import { useCallback } from 'react';
import type React from 'react';
import { ApiError } from '@/lib/api-client';
import { buildImageUrl, uploadImageFile } from '@/lib/api/image-upload-api-client';

export interface ClipboardImageUploadOptions {
  onImageInsert: (url: string, filename: string) => void;
  onError?: (error: string) => void;
}

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];

export const useClipboardImageUpload = ({ onImageInsert, onError }: ClipboardImageUploadOptions) => {
  const handleImageUpload = useCallback(
    async (file: File) => {
      if (file.size > MAX_IMAGE_SIZE) {
        const errorMessage = '이미지 크기는 10MB를 초과할 수 없습니다.';
        onError?.(errorMessage);
        return;
      }

      if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
        const errorMessage = '지원하지 않는 이미지 형식입니다. (PNG, JPEG, GIF, WebP)';
        onError?.(errorMessage);
        return;
      }

      try {
        const response = await uploadImageFile(file);
        const imageUrl = buildImageUrl(response.url);
        const filename = response.originalName || file.name;

        onImageInsert(imageUrl, filename);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        let errorMessage = '이미지 업로드에 실패했습니다.';

        if (error instanceof ApiError) {
          errorMessage =
            error.status === 0 ? '네트워크 오류가 발생했습니다.' : `업로드 실패: ${error.message}`;
        } else if (error instanceof Error && error.message) {
          errorMessage = error.message;
        }

        onError?.(errorMessage);
      }
    },
    [onImageInsert, onError]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent | ClipboardEvent) => {
      const clipboard = e.clipboardData;
      const items = clipboard?.items;
      if (!clipboard || !items) return;

      const hasHtml = Boolean(clipboard.getData('text/html'));
      const hasRichText = Boolean(clipboard.getData('text/rtf'));

      if (hasHtml || hasRichText) {
        return;
      }

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') === 0) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            handleImageUpload(file);
          }
          break;
        }
      }
    },
    [handleImageUpload]
  );

  return {
    handlePaste,
    handleImageUpload,
  };
};
