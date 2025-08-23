import type { ThemeType, ThemeChangeHandler } from '$lib/types/theme';
import { THEME } from '$lib/types/theme';

// 테마 감지 유틸: 라이트/다크 모드 문자열 반환
export function getCurrentTheme(): ThemeType {
  if (typeof document === 'undefined') return THEME.LIGHT;
  const cls = document.documentElement.classList;
  return cls.contains('dark') ? THEME.DARK : THEME.LIGHT;
}

export function onThemeChange(callback: ThemeChangeHandler): () => void {
  // 간단한 MutationObserver로 html class 변경 감지
  if (typeof document === 'undefined') return () => {};
  const target = document.documentElement;
  const observer = new MutationObserver(() => callback(getCurrentTheme()));
  observer.observe(target, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}
