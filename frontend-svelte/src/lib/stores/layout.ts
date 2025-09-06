// 레이아웃/테마 관련 유틸리티 (Svelte Runes 사용 금지)
// - Svelte 5 Runes는 .svelte 파일 내에서만 사용 가능하므로 이 파일은 순수 TS 헬퍼만 제공합니다.

import type { ThemeType } from '$lib/utils/theme';
import { THEME, ThemeUtils } from '$lib/utils/theme';

// @deprecated - ThemeType을 사용하세요
export type Theme = ThemeType;

export const THEME_KEY = 'theme';
export const SIDEBAR_KEY = 'layout:sidebar-open:desktop';
export const DESKTOP_MEDIA_QUERY = '(min-width: 1024px)';

export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

// 테마 헬퍼
export function readTheme(): ThemeType | null {
  if (!isBrowser()) {
    return null;
  }
  const saved = localStorage.getItem(THEME_KEY);
  return saved === THEME.LIGHT || saved === THEME.DARK ? (saved as ThemeType) : null;
}

export function saveTheme(theme: ThemeType): void {
  if (!isBrowser()) {
    return;
  }
  localStorage.setItem(THEME_KEY, theme);
}

export function applyThemeToDocument(theme: ThemeType): void {
  if (!isBrowser()) {
    return;
  }
  document.documentElement.classList.toggle('dark', ThemeUtils.isDark(theme));
}

// 사이드바(데스크톱) 헬퍼
export function readDesktopSidebarPref(): boolean | null {
  if (!isBrowser()) {
    return null;
  }
  const saved = localStorage.getItem(SIDEBAR_KEY);
  return saved == null ? null : saved === '1';
}

export function saveDesktopSidebarPref(open: boolean): void {
  if (!isBrowser()) {
    return;
  }
  localStorage.setItem(SIDEBAR_KEY, open ? '1' : '0');
}

export function matchDesktop(): boolean {
  if (!isBrowser()) {
    return false;
  }
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

export function onDesktopChange(handler: (isDesktop: boolean) => void): () => void {
  if (!isBrowser()) {
    return () => {};
  }
  const mq = window.matchMedia(DESKTOP_MEDIA_QUERY);
  const listener = () => handler(mq.matches);
  mq.addEventListener('change', listener);
  return () => mq.removeEventListener('change', listener);
}
