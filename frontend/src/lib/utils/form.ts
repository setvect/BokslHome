import type { Writable } from 'svelte/store';

/**
 * 폼 필드의 포커스/블러 핸들러를 생성하는 유틸리티 함수
 * 
 * @param fieldName - 필드 이름
 * @param focusedField - 현재 포커스된 필드를 추적하는 상태
 * @param errors - 에러 상태를 관리하는 스토어
 * @param validate - 유효성 검증 함수
 * @param extraOnBlur - 블러 시 추가로 실행할 콜백 함수 (선택사항)
 * @returns 포커스/블러 이벤트 핸들러 객체
 * 
 * @example
 * ```typescript
 * // Svelte 컴포넌트에서 사용
 * let focusedField = $state<string | null>(null);
 * const { form, errors, validate } = superForm(initialData, {...});
 * 
 * <Input 
 *   {...createFieldHandlers('email', focusedField, errors, validate)}
 * />
 * 
 * // 추가 로직이 필요한 경우
 * <Input 
 *   {...createFieldHandlers('password', focusedField, errors, validate, () => {
 *     // 비밀번호 확인 필드 재검증
 *     validate('confirmPassword');
 *   })}
 * />
 * ```
 */
export function createFieldHandlers<T extends string>(
  fieldName: T,
  focusedField: { current: string | null },
  errors: Writable<Record<string, string[] | undefined>>,
  validate: (field: any) => void, // any 타입으로 변경하여 Superforms 타입과 호환
  extraOnBlur?: () => void
) {
  return {
    onfocus: () => {
      focusedField.current = fieldName;
      errors.update(errs => ({ ...errs, [fieldName]: undefined }));
    },
    onblur: () => {
      focusedField.current = null;
      validate(fieldName);
      extraOnBlur?.();
    }
  };
}

/**
 * 조건부 에러 표시 여부를 확인하는 유틸리티 함수
 * 
 * @param errors - 에러 상태 객체
 * @param fieldName - 확인할 필드 이름
 * @param focusedField - 현재 포커스된 필드
 * @returns 에러를 표시해야 하는지 여부
 * 
 * @example
 * ```typescript
 * {#if shouldShowError($errors, 'email', focusedField)}
 *   <p class="text-sm text-destructive">{$errors.email}</p>
 * {/if}
 * ```
 */
export function shouldShowError(
  errors: Record<string, string[] | undefined>,
  fieldName: string,
  focusedField: string | null
): boolean {
  return !!(errors[fieldName] && focusedField !== fieldName);
}

/**
 * aria-invalid 속성 값을 계산하는 유틸리티 함수
 * 
 * @param errors - 에러 상태 객체
 * @param fieldName - 확인할 필드 이름
 * @param focusedField - 현재 포커스된 필드
 * @returns aria-invalid 속성 값
 * 
 * @example
 * ```typescript
 * <Input 
 *   aria-invalid={getAriaInvalid($errors, 'email', focusedField)}
 * />
 * ```
 */
export function getAriaInvalid(
  errors: Record<string, string[] | undefined>,
  fieldName: string,
  focusedField: string | null
): 'true' | undefined {
  return shouldShowError(errors, fieldName, focusedField) ? 'true' : undefined;
}