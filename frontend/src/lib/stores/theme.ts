import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

// 시스템 다크 모드 감지
function getSystemTheme(): 'light' | 'dark' {
  if (!browser) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// localStorage에서 테마 불러오기
function getStoredTheme(): Theme {
  if (!browser) return 'system';
  return (localStorage.getItem('theme') as Theme) || 'system';
}

// 실제 적용될 테마 계산
function getAppliedTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
}

// 테마 store 생성
function createThemeStore() {
  const { subscribe, set, update } = writable<Theme>(getStoredTheme());

  return {
    subscribe,
    // 테마 설정
    setTheme: (theme: Theme) => {
      if (browser) {
        localStorage.setItem('theme', theme);
        
        // HTML 클래스 업데이트
        const root = document.documentElement;
        const appliedTheme = getAppliedTheme(theme);
        
        if (appliedTheme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
      set(theme);
    },
    // 테마 토글 (light ↔ dark)
    toggleTheme: () => {
      update(currentTheme => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        if (browser) {
          localStorage.setItem('theme', newTheme);
          
          // HTML 클래스 업데이트
          const root = document.documentElement;
          if (newTheme === 'dark') {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
        }
        
        return newTheme;
      });
    },
    // 초기화 (브라우저에서만 실행)
    init: () => {
      if (browser) {
        const storedTheme = getStoredTheme();
        const appliedTheme = getAppliedTheme(storedTheme);
        
        // HTML 클래스 초기 설정
        const root = document.documentElement;
        if (appliedTheme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        
        set(storedTheme);
        
        // 시스템 테마 변경 감지
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', () => {
          update(currentTheme => {
            if (currentTheme === 'system') {
              const newAppliedTheme = getAppliedTheme('system');
              if (newAppliedTheme === 'dark') {
                root.classList.add('dark');
              } else {
                root.classList.remove('dark');
              }
            }
            return currentTheme;
          });
        });
      }
    }
  };
}

export const theme = createThemeStore();