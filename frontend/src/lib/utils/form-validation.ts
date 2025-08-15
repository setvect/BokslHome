import { z } from 'zod';

/**
 * 폼 검증을 위한 유틸리티 함수들
 */

/**
 * 개별 필드 검증
 */
export function validateField<T>(
  schema: z.ZodObject<any> | z.ZodEffects<any>,
  formData: T,
  fieldName: string
): string {
  try {
    // ZodEffects인 경우 전체 스키마 검증 후 특정 필드 에러만 추출
    if (schema instanceof z.ZodEffects) {
      const result = schema.safeParse(formData);
      if (!result.success) {
        const fieldError = result.error.errors.find(error => 
          error.path[0] === fieldName
        );
        return fieldError ? fieldError.message : '';
      }
      return '';
    }
    
    // ZodObject인 경우 기존 로직
    if ('shape' in schema) {
      const fieldSchema = (schema.shape as any)[fieldName];
      if (fieldSchema) {
        fieldSchema.parse((formData as any)[fieldName]);
        return '';
      }
    }
    return '';
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0].message;
    }
    return '';
  }
}

/**
 * 전체 폼 검증
 */
export function validateForm<T>(
  schema: z.ZodSchema<T>,
  formData: T
): { isValid: boolean; errors: Record<string, string> } {
  const result = schema.safeParse(formData);
  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.errors.forEach(error => {
      if (error.path[0]) {
        errors[error.path[0].toString()] = error.message;
      }
    });
    return { isValid: false, errors };
  }
  return { isValid: true, errors: {} };
}

/**
 * 스키마에서 모든 필드명 추출
 */
export function getSchemaFields(schema: z.ZodObject<any> | z.ZodEffects<any>): string[] {
  // ZodEffects인 경우 내부 스키마에서 필드명 추출
  if (schema instanceof z.ZodEffects) {
    const innerSchema = (schema as any)._def.schema;
    if ('shape' in innerSchema) {
      return Object.keys(innerSchema.shape);
    }
  }
  
  // ZodObject인 경우
  if ('shape' in schema) {
    return Object.keys(schema.shape);
  }
  return [];
}

/**
 * 필드의 CSS 클래스 생성
 */
export function getFieldClasses(hasError: boolean, baseClasses: string = ''): string {
  const errorClasses = hasError 
    ? 'border-destructive focus-visible:ring-destructive' 
    : '';
  return [baseClasses, errorClasses].filter(Boolean).join(' ');
}

