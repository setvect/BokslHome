// Form 유틸리티 함수들

import type { Writable } from 'svelte/store';

/**
 * 필드 핸들러를 생성하는 함수
 */
export function createFieldHandlers(
  fieldName: string,
  focusedFieldRef: Writable<string | null>,
  errors: any,
  validate: (field: string) => void,
  onChange?: (value: string) => void
) {
  return {
    onfocus: () => focusedFieldRef.set(fieldName),
    onblur: () => {
      focusedFieldRef.set(null);
      validate(fieldName);
    },
    oninput: onChange ? (e: Event) => {
      const target = e.target as HTMLInputElement;
      onChange(target.value);
    } : undefined
  };
}

/**
 * 에러를 표시해야 하는지 판단하는 함수
 */
export function shouldShowError(
  errors: any,
  fieldName: string,
  focusedField: string | null
): boolean {
  return errors[fieldName] && errors[fieldName].length > 0 && focusedField !== fieldName;
}

/**
 * aria-invalid 속성 값을 반환하는 함수
 */
export function getAriaInvalid(
  errors: any,
  fieldName: string,
  focusedField: string | null
): boolean {
  return shouldShowError(errors, fieldName, focusedField);
}