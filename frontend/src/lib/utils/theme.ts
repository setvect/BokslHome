// 테마 관련 유틸리티 - 모든 테마 기능을 통합 관리

// ===== 타입 정의 =====

// 테마 enum (Java enum과 유사)
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

// 테마 타입 (Union type)
export type ThemeType = 'light' | 'dark';

// 테마 상수 객체 (const assertion으로 readonly)
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark'
} as const;

// THEME 객체의 값들로부터 타입 추론
export type ThemeValue = typeof THEME[keyof typeof THEME];

// 테마 변경 핸들러 타입
export type ThemeChangeHandler = (theme: ThemeType) => void;

// 향후 확장 가능한 테마들 (예시)
// export enum ExtendedTheme {
//   LIGHT = 'light',
//   DARK = 'dark',
//   BLUE = 'blue',
//   GREEN = 'green',
//   PURPLE = 'purple'
// }

// ===== 유틸리티 함수 =====

// 테마 관련 유틸리티 함수들
export const ThemeUtils = {
  // 테마가 다크인지 확인
  isDark: (theme: ThemeType): boolean => theme === THEME.DARK,
  
  // 테마가 라이트인지 확인  
  isLight: (theme: ThemeType): boolean => theme === THEME.LIGHT,
  
  // 테마 토글
  toggle: (theme: ThemeType): ThemeType => theme === THEME.DARK ? THEME.LIGHT : THEME.DARK,
  
  // 유효한 테마인지 확인
  isValidTheme: (value: string): value is ThemeType => {
    return value === THEME.LIGHT || value === THEME.DARK;
  },
  
  // 기본 테마 반환
  getDefaultTheme: (): ThemeType => THEME.LIGHT
};

// ===== DOM 기반 함수들 =====

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