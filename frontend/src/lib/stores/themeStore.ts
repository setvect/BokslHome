import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// 초기 다크모드 상태를 감지하는 함수
function getInitialDarkMode(): boolean {
  if (!browser) return false;

  // 1. localStorage에서 저장된 테마 확인
  const savedTheme = localStorage.getItem('color-theme');
  if (savedTheme === 'dark') return true;
  if (savedTheme === 'light') return false;

  // 2. HTML 클래스 확인
  if (document.documentElement.classList.contains('dark')) return true;

  // 3. 시스템 선호도 확인
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return true;

  return false;
}

// 초기값을 올바르게 설정
export const isDarkMode = writable(getInitialDarkMode());

// 다크모드 상태를 토글하는 함수
export function toggleDarkMode(): void {
  isDarkMode.update((current) => !current);
}

// 다크모드 상태를 설정하는 함수
export function setDarkMode(value: boolean): void {
  isDarkMode.set(value);
}
