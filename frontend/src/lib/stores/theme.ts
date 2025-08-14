import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

// localStorage에서 테마 불러오기 (없으면 다크 테마 기본값)
function getStoredTheme(): Theme {
  if (!browser) return 'dark';
  const stored = localStorage.getItem('theme') as Theme;
  return stored || 'dark';
}

// 테마 store 생성
function createThemeStore() {
  const initialTheme = browser ? getStoredTheme() : 'dark';
  const { subscribe, set: setStore, update } = writable<Theme>(initialTheme);
  let currentValue: Theme = initialTheme;

  return {
    subscribe,
    // 현재 테마 값 가져오기
    get: () => currentValue,
    // 테마 설정
    set: (theme: Theme) => {
      currentValue = theme;
      if (browser) {
        localStorage.setItem('theme', theme);
        
        // HTML 클래스 업데이트
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
      setStore(theme);
    },
    // 테마 토글 (light ↔ dark)
    toggleTheme: () => {
      update(currentTheme => {
        currentValue = currentTheme === 'light' ? 'dark' : 'light';
        const newTheme = currentValue;
        
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
        currentValue = storedTheme;
        
        // HTML에서 이미 테마가 설정되어 있으므로 스토어 상태만 동기화
        setStore(storedTheme);
      }
    }
  };
}

export const theme = createThemeStore();