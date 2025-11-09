// Mock 파일 업로드 API
export interface UploadResult {
  success: boolean;
  url?: string;
  filename?: string;
  error?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export const mockUploadFile = async (file: File): Promise<UploadResult> => {
  // 파일 크기 제한 (10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      success: false,
      error: '파일 크기는 10MB를 초과할 수 없습니다.',
    };
  }

  // 지원하는 이미지 형식 확인
  const supportedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
  if (!supportedTypes.includes(file.type)) {
    return {
      success: false,
      error: '지원하지 않는 파일 형식입니다. (PNG, JPEG, GIF, WebP만 지원)',
    };
  }

  try {
    // FormData 생성 (실제 API 호출과 동일)
    const formData = new FormData();
    formData.append('file', file);

    // Mock API 응답 생성 (실제 백엔드 응답 형태)
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop() || 'png';
    const mockFilename = `upload_${timestamp}_${randomId}.${extension}`;

    // 가상의 서버 이미지 경로 반환
    const mockServerUrl = `/uploads/images/${new Date().getFullYear()}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${mockFilename}`;

    return {
      success: true,
      url: mockServerUrl, // 실제 서버 경로 형태
      filename: mockFilename,
    };
  } catch (error) {
    return {
      success: false,
      error: '업로드 중 오류가 발생했습니다.',
    };
  }
};

// 실제 백엔드 API 구현 시 교체할 함수
export const uploadImageFile = mockUploadFile;
