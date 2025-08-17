// 공용 유틸 함수와 타입을 export하는 엔트리 파일
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function noop(): void {}

export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

// Tailwind 클래스 병합 유틸
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}
