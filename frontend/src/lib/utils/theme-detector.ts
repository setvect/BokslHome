// 테마 감지 유틸리티
export function detectTheme(): boolean {
  if (typeof window === 'undefined') return false;

  // HTML 클래스에서 다크 모드 감지
  const htmlHasDark = document.documentElement.classList.contains('dark');

  // localStorage에서 테마 설정 확인
  let storedTheme: string | null = null;
  try {
    storedTheme = localStorage.getItem('theme');
  } catch {
    // localStorage 접근 실패 시 무시
  }

  if (storedTheme === 'dark') return true;
  if (storedTheme === 'light') return false;

  // system 모드이거나 설정이 없으면 HTML 클래스 또는 시스템 선호도 사용
  return htmlHasDark || window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// 테마 변화 감지 함수 타입
export type ThemeChangeHandler = (isDarkMode: boolean) => void;

// 테마 변화 감지 설정
export function setupThemeWatcher(handler: ThemeChangeHandler) {
  let currentIsDarkMode = detectTheme();

  const checkThemeChange = () => {
    const newIsDarkMode = detectTheme();
    if (newIsDarkMode !== currentIsDarkMode) {
      currentIsDarkMode = newIsDarkMode;
      handler(newIsDarkMode);
    }
  };

  // HTML 클래스 변화 감지 (MutationObserver)
  const observer = new MutationObserver(checkThemeChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });

  // 시스템 테마 변화 감지
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', checkThemeChange);

  // localStorage 변화 감지 (다른 탭에서 테마 변경)
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'theme') {
      checkThemeChange();
    }
  };
  window.addEventListener('storage', handleStorageChange);

  // 정리 함수 반환
  return () => {
    observer.disconnect();
    mediaQuery.removeEventListener('change', checkThemeChange);
    window.removeEventListener('storage', handleStorageChange);
  };
}
