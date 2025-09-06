import { z } from 'zod';

// 로그인 폼 스키마
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('유효한 이메일 주소를 입력해주세요.'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요.')
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
  rememberMe: z.boolean().default(false),
});

// 회원가입 폼 스키마
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, '이름을 입력해주세요.')
      .min(2, '이름은 최소 2자 이상이어야 합니다.')
      .max(50, '이름은 50자를 초과할 수 없습니다.'),
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('유효한 이메일 주소를 입력해주세요.'),
    password: z
      .string()
      .min(1, '비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        '비밀번호는 대문자, 소문자, 숫자를 각각 최소 1개씩 포함해야 합니다.'
      ),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
    terms: z.boolean().refine((value) => value === true, {
      message: '이용약관에 동의해야 합니다.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

// 연락처 폼 스키마
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .min(2, '이름은 최소 2자 이상이어야 합니다.'),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('유효한 이메일 주소를 입력해주세요.'),
  subject: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(100, '제목은 100자를 초과할 수 없습니다.'),
  message: z
    .string()
    .min(1, '메시지를 입력해주세요.')
    .min(10, '메시지는 최소 10자 이상이어야 합니다.')
    .max(1000, '메시지는 1000자를 초과할 수 없습니다.'),
  category: z.enum(['general', 'support', 'feedback', 'bug'], {
    message: '카테고리를 선택해주세요.',
  }),
});

// 프로필 편집 폼 스키마
export const profileSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .min(2, '이름은 최소 2자 이상이어야 합니다.')
    .max(50, '이름은 50자를 초과할 수 없습니다.'),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('유효한 이메일 주소를 입력해주세요.'),
  bio: z
    .string()
    .max(500, '소개는 500자를 초과할 수 없습니다.')
    .optional(),
  website: z
    .string()
    .url('유효한 웹사이트 URL을 입력해주세요.')
    .optional()
    .or(z.literal('')),
  location: z
    .string()
    .max(100, '위치는 100자를 초과할 수 없습니다.')
    .optional(),
});

// 설정 폼 스키마
export const settingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system'], {
    message: '테마를 선택해주세요.',
  }),
  language: z.enum(['ko', 'en'], {
    message: '언어를 선택해주세요.',
  }),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    marketing: z.boolean(),
  }),
  privacy: z.object({
    profileVisibility: z.enum(['public', 'private'], {
      message: '프로필 공개 설정을 선택해주세요.',
    }),
    searchable: z.boolean(),
  }),
});

// 타입 추론
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type SettingsFormData = z.infer<typeof settingsSchema>;

// 폼 필드 공통 타입
export interface FormFieldError {
  message?: string;
}

// 폼 상태 타입
export interface FormState {
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  submitCount: number;
}