import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { theme } from './theme';

interface LayoutState {
  isSidebarOpen: boolean;
  currentTheme: string;
  mounted: boolean;
}

// 레이아웃 상태 통합 관리
function createLayoutStore() {
  const initialState: LayoutState = {
    isSidebarOpen: false,
    currentTheme: 'dark',
    mounted: false
  };

  const { subscribe, update } = writable<LayoutState>(initialState);

  return {
    subscribe,
    
    // 초기화
    init: () => {
      if (browser) {
        theme.init();
        const storedSidebarState = localStorage.getItem('sidebarOpen') === 'true';
        
        update(state => ({
          ...state,
          isSidebarOpen: storedSidebarState,
          currentTheme: theme.get(),
          mounted: true
        }));

        // 테마 변경 구독
        theme.subscribe((newTheme) => {
          update(state => ({ ...state, currentTheme: newTheme }));
        });
      }
    },

    // 사이드바 토글
    toggleSidebar: () => {
      update(state => {
        const newSidebarState = !state.isSidebarOpen;
        if (browser) {
          localStorage.setItem('sidebarOpen', newSidebarState.toString());
        }
        return { ...state, isSidebarOpen: newSidebarState };
      });
    },

    // 사이드바 닫기
    closeSidebar: () => {
      update(state => {
        if (browser) {
          localStorage.setItem('sidebarOpen', 'false');
        }
        return { ...state, isSidebarOpen: false };
      });
    },

    // 테마 토글
    toggleTheme: () => {
      if (browser) {
        update(state => {
          const newTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
          theme.set(newTheme);
          return { ...state, currentTheme: newTheme };
        });
      }
    }
  };
}

export const layout = createLayoutStore();