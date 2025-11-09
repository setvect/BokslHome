'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

/**
 * 현재 테마가 다크 모드인지 감지하는 훅
 * system 테마일 경우 실제 시스템 설정을 확인하여 결정
 */
export function useIsDarkMode() {
  const { theme, systemTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // theme이 'system'이면 systemTheme 사용, 아니면 theme 사용
    const currentTheme = theme === 'system' ? systemTheme : theme;
    setIsDarkMode(currentTheme === 'dark');
  }, [theme, systemTheme]);

  return isDarkMode;
}

/**
 * 테마 변경을 감지하고 콜백 함수를 실행하는 훅
 */
export function useThemeChange(callback: (isDark: boolean) => void) {
  const isDarkMode = useIsDarkMode();

  useEffect(() => {
    callback(isDarkMode);
  }, [isDarkMode, callback]);
}

/**
 * 현재 테마 정보를 반환하는 훅
 */
export function useCurrentTheme() {
  const { theme, systemTheme } = useTheme();
  const isDarkMode = useIsDarkMode();

  return {
    theme,
    systemTheme,
    isDarkMode,
    currentTheme: theme === 'system' ? systemTheme : theme,
  };
}

/**
 * 시스템 다크 모드 설정을 감지하는 함수 (클라이언트 사이드에서만 동작)
 */
export function detectSystemDarkMode(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
