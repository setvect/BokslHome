import { createForm } from '@felte/core';
import { validator } from '@felte/validator-zod';
import { writable } from 'svelte/store';
import { ZodSchema } from 'zod';

// 폼 필드 타입 정의
type FormField = string | number | boolean | null;
type FormData = Record<string, FormField>;

// 폼 설정 옵션 타입
interface FormOptions<T> {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  resetOnSubmit?: boolean;
  onError?: (errors: Record<keyof T, string[]>) => void;
  transform?: (values: T) => T;
}

export function useForm<T extends FormData>(
  schema: ZodSchema<T>,
  initialValues: T,
  onSubmit: (values: T) => void | Promise<void>,
  options: FormOptions<T> = {}
) {
  const { validateOnChange = true, validateOnBlur = true, resetOnSubmit = false, onError } = options;

  const form = createForm<T>(
    {
      extend: [validator({ schema })],
      initialValues,
      onSubmit: async (values) => {
        try {
          await onSubmit(values);
          if (resetOnSubmit) {
            form.reset();
          }
        } catch (error) {
          console.error('Form submission error:', error);
          if (onError) {
            let errors: Record<keyof T, string[]> = {} as Record<keyof T, string[]>;
            if (typeof error === 'object' && error !== null && 'errors' in error) {
              errors = (error as { errors: Record<keyof T, string[]> }).errors;
            }
            onError(errors);
          }
          throw error;
        }
      },
      validateOnChange,
      validateOnBlur
    },
    {
      storeFactory: (store) => {
        const { subscribe, set, update } = writable(store);
        return { subscribe, set, update };
      }
    }
  );

  // 중복 업데이트 로직을 위한 헬퍼 함수
  const updateFieldValue = (fieldName: keyof T, value: FormField) => {
    form.setFields((currentValues) => ({
      ...currentValues,
      [fieldName]: value as T[keyof T]
    }));
  };

  const resetField = (fieldName: keyof T) => {
    updateFieldValue(fieldName, initialValues[fieldName]);
  };

  const setFieldValue = (fieldName: keyof T, value: FormField) => {
    updateFieldValue(fieldName, value);
  };

  return {
    ...form,
    resetField,
    setFieldValue
  };
}
