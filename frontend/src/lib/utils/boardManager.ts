/**
 * 게시판 관리 유틸리티 함수
 */

import type { 
  BoardManager, 
  BoardManagerDbResponse, 
  BoardManagerFormData, 
  BoardManagerValidationErrors,
  ValidationResult,
  YNBoolean 
} from '$lib/types/boardManager';

/**
 * DB Y/N 값을 boolean으로 변환
 */
export function ynToBoolean(value: YNBoolean): boolean {
  return value === 'Y';
}

/**
 * boolean 값을 DB Y/N 값으로 변환
 */
export function booleanToYN(value: boolean): YNBoolean {
  return value ? 'Y' : 'N';
}

/**
 * DB 응답 데이터를 프론트엔드 BoardManager 타입으로 변환
 */
export function convertDbResponseToBoardManager(dbData: BoardManagerDbResponse): BoardManager {
  return {
    boardCode: dbData.boardCode,
    name: dbData.name,
    uploadLimit: dbData.uploadLimit,
    replyF: ynToBoolean(dbData.replyF),
    commentF: ynToBoolean(dbData.commentF),
    attachF: ynToBoolean(dbData.attachF),
    encryptF: ynToBoolean(dbData.encryptF),
    deleteF: ynToBoolean(dbData.deleteF)
  };
}

/**
 * 프론트엔드 BoardManager 타입을 DB 저장용 형태로 변환
 */
export function convertBoardManagerToDbFormat(boardManager: BoardManager): BoardManagerDbResponse {
  return {
    boardCode: boardManager.boardCode,
    name: boardManager.name,
    uploadLimit: boardManager.uploadLimit,
    replyF: booleanToYN(boardManager.replyF),
    commentF: booleanToYN(boardManager.commentF),
    attachF: booleanToYN(boardManager.attachF),
    encryptF: booleanToYN(boardManager.encryptF),
    deleteF: booleanToYN(boardManager.deleteF)
  };
}

/**
 * 폼 데이터를 BoardManager 타입으로 변환 (삭제 여부는 기본값 false)
 */
export function convertFormDataToBoardManager(formData: BoardManagerFormData): BoardManager {
  return {
    ...formData,
    deleteF: false // 새로 생성하는 경우 삭제되지 않은 상태로 설정
  };
}

/**
 * 게시판 코드 검증 (영문대문자 + 숫자, 3-20자)
 */
export function validateBoardCode(boardCode: string): string | null {
  if (!boardCode.trim()) {
    return '게시판 코드를 입력해주세요.';
  }
  
  const codePattern = /^[A-Z0-9]{3,20}$/;
  if (!codePattern.test(boardCode)) {
    return '게시판 코드는 영문 대문자와 숫자로 3-20자 이내로 입력해주세요.';
  }
  
  return null;
}

/**
 * 게시판 이름 검증
 */
export function validateBoardName(name: string): string | null {
  if (!name.trim()) {
    return '게시판 이름을 입력해주세요.';
  }
  
  if (name.length > 50) {
    return '게시판 이름은 50자 이내로 입력해주세요.';
  }
  
  return null;
}

/**
 * 업로드 제한 크기 검증
 */
export function validateUploadLimit(uploadLimit: number): string | null {
  if (uploadLimit < 0) {
    return '업로드 제한 크기는 0 이상의 값을 입력해주세요.';
  }
  
  if (uploadLimit > 10240) { // 10MB
    return '업로드 제한 크기는 10MB(10240KB) 이하로 설정해주세요.';
  }
  
  return null;
}

/**
 * 게시판 관리자 폼 데이터 전체 검증
 */
export function validateBoardManagerForm(formData: BoardManagerFormData): ValidationResult {
  const errors: BoardManagerValidationErrors = {};
  
  const boardCodeError = validateBoardCode(formData.boardCode);
  if (boardCodeError) {
    errors.boardCode = boardCodeError;
  }
  
  const nameError = validateBoardName(formData.name);
  if (nameError) {
    errors.name = nameError;
  }
  
  const uploadLimitError = validateUploadLimit(formData.uploadLimit);
  if (uploadLimitError) {
    errors.uploadLimit = uploadLimitError;
  }
  
  const isValid = Object.keys(errors).length === 0;
  
  return {
    isValid,
    errors
  };
}

/**
 * 업로드 제한 크기를 사람이 읽기 쉬운 형태로 변환
 */
export function formatUploadLimit(limitInKB: number): string {
  if (limitInKB === 0) {
    return '제한 없음';
  }
  
  if (limitInKB < 1024) {
    return `${limitInKB}KB`;
  }
  
  const limitInMB = (limitInKB / 1024).toFixed(1);
  return `${limitInMB}MB`;
}

/**
 * 게시판 기능 상태를 사람이 읽기 쉬운 형태로 변환
 */
export function formatFeatureStatus(enabled: boolean): string {
  return enabled ? '사용' : '미사용';
}

/**
 * 빈 게시판 관리자 폼 데이터 생성
 */
export function createEmptyBoardManagerForm(): BoardManagerFormData {
  return {
    boardCode: '',
    name: '',
    uploadLimit: 1000, // 기본값 1MB
    replyF: true,
    commentF: true,
    attachF: true,
    encryptF: false
  };
}

/**
 * 게시판 관리자 데이터에서 폼 데이터로 변환
 */
export function boardManagerToFormData(boardManager: BoardManager): BoardManagerFormData {
  return {
    boardCode: boardManager.boardCode,
    name: boardManager.name,
    uploadLimit: boardManager.uploadLimit,
    replyF: boardManager.replyF,
    commentF: boardManager.commentF,
    attachF: boardManager.attachF,
    encryptF: boardManager.encryptF
  };
}