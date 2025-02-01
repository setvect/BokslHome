import { createForm, type AssignableErrors } from '@felte/core';
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
  const { validateOnChange = true, validateOnBlur = true, resetOnSubmit = false } = options;

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
          throw error;
        }
      },
      validate: (values) => {
        const result = schema.safeParse(values);
        if (result.success) {
          return undefined;
        }
        return Object.fromEntries(
          Object.entries(result.error.formErrors.fieldErrors).map(([key, value]) => [key, Array.isArray(value) ? value : [String(value)]])
        ) as AssignableErrors<T>;
      },
      validateOnChange, // 추가
      validateOnBlur // 추가
    },
    {
      storeFactory: (store) => {
        const { subscribe, set, update } = writable(store);
        return { subscribe, set, update };
      }
    }
  );

  // 유용한 헬퍼 메서드 추가
  const resetField = (fieldName: keyof T) => {
    const updatedFields: Partial<T> = {};
    updatedFields[fieldName] = initialValues[fieldName];
    form.setFields((currentValues) => ({
      ...currentValues,
      ...updatedFields
    }));
  };

  const setFieldValue = (fieldName: keyof T, value: FormField) => {
    const updatedFields: Partial<T> = {};
    updatedFields[fieldName] = value as T[keyof T];
    form.setFields((currentValues) => ({
      ...currentValues,
      ...updatedFields
    }));
  };

  return {
    ...form,
    resetField,
    setFieldValue
  };
}
