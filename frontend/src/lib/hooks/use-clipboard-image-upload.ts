import { useCallback } from 'react'
import { uploadImageFile } from '@/lib/utils/mock-upload-api'

export interface ClipboardImageUploadOptions {
  onImageInsert: (url: string, filename: string) => void
  onError?: (error: string) => void
}

export const useClipboardImageUpload = ({ onImageInsert, onError }: ClipboardImageUploadOptions) => {
  // 이미지 업로드 처리
  const handleImageUpload = useCallback(async (file: File) => {
    try {
      const result = await uploadImageFile(file)

      if (result.success && result.url) {
        onImageInsert(result.url, file.name)
      } else {
        const errorMessage = result.error || '업로드에 실패했습니다.'
        console.error('이미지 업로드 실패:', errorMessage)
        onError?.(errorMessage)
      }
    } catch (error) {
      const errorMessage = '업로드 중 오류가 발생했습니다.'
      console.error('이미지 업로드 실패:', error)
      onError?.(errorMessage)
    }
  }, [onImageInsert, onError])

  // 클립보드 paste 이벤트 처리
  const handlePaste = useCallback((e: React.ClipboardEvent | ClipboardEvent) => {
    const clipboard = e.clipboardData
    const items = clipboard?.items
    if (!clipboard || !items) return

    const hasHtml = Boolean(clipboard.getData('text/html'))
    const hasRichText = Boolean(clipboard.getData('text/rtf'))

    // 텍스트/표 데이터가 존재하면 기본 붙여넣기를 유지한다.
    if (hasHtml || hasRichText) {
      return
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.type.indexOf('image') === 0) {
        e.preventDefault()
        const file = item.getAsFile()
        if (file) {
          handleImageUpload(file)
        }
        break
      }
    }
  }, [handleImageUpload])

  return {
    handlePaste,
    handleImageUpload
  }
}
