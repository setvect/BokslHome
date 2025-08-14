import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { theme } from './theme';

export interface LayoutState {
  isSidebarOpen: boolean;
  currentTheme: string;
  mounted: boolean;
  currentMenu: {
    activeMenuId?: string;
    activeSubMenuId?: string;
    expandedMenus: string[];
  };
}

// 레이아웃 상태 통합 관리
function createLayoutStore() {
  const initialState: LayoutState = {
    isSidebarOpen: false,
    currentTheme: 'dark',
    mounted: false,
    currentMenu: {
      activeMenuId: undefined,
      activeSubMenuId: undefined,
      expandedMenus: []
    }
  };

  const { subscribe, update } = writable<LayoutState>(initialState);

  return {
    subscribe,

    // 초기화
    init: () => {
      if (browser) {
        theme.init();
        const storedSidebarState = localStorage.getItem('sidebarOpen') === 'true';
        const storedExpandedMenus = JSON.parse(localStorage.getItem('expandedMenus') || '[]');

        update((state) => ({
          ...state,
          isSidebarOpen: storedSidebarState,
          currentTheme: theme.get(),
          mounted: true,
          currentMenu: {
            ...state.currentMenu,
            expandedMenus: storedExpandedMenus
          }
        }));

        // 테마 변경 구독
        theme.subscribe((newTheme) => {
          update((state) => ({ ...state, currentTheme: newTheme }));
        });
      }
    },

    // 사이드바 토글
    toggleSidebar: () => {
      update((state) => {
        const newSidebarState = !state.isSidebarOpen;
        if (browser) {
          localStorage.setItem('sidebarOpen', newSidebarState.toString());
        }
        return { ...state, isSidebarOpen: newSidebarState };
      });
    },

    // 사이드바 닫기
    closeSidebar: () => {
      update((state) => {
        if (browser) {
          localStorage.setItem('sidebarOpen', 'false');
        }
        return { ...state, isSidebarOpen: false };
      });
    },

    // 테마 토글
    toggleTheme: () => {
      if (browser) {
        update((state) => {
          const newTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
          theme.set(newTheme);
          return { ...state, currentTheme: newTheme };
        });
      }
    },

    // 메뉴 확장/축소 토글
    toggleMenu: (menuId: string) => {
      update((state) => {
        const isExpanded = state.currentMenu.expandedMenus.includes(menuId);
        const newExpandedMenus = isExpanded
          ? state.currentMenu.expandedMenus.filter((id) => id !== menuId)
          : [...state.currentMenu.expandedMenus, menuId];

        if (browser) {
          localStorage.setItem('expandedMenus', JSON.stringify(newExpandedMenus));
        }

        return {
          ...state,
          currentMenu: {
            ...state.currentMenu,
            expandedMenus: newExpandedMenus
          }
        };
      });
    },

    // 활성 메뉴 설정
    setActiveMenu: (menuId: string, subMenuId?: string) => {
      update((state) => ({
        ...state,
        currentMenu: {
          ...state.currentMenu,
          activeMenuId: menuId,
          activeSubMenuId: subMenuId
        }
      }));
    },

    // 메뉴 상태 초기화
    resetMenuState: () => {
      update((state) => ({
        ...state,
        currentMenu: {
          activeMenuId: undefined,
          activeSubMenuId: undefined,
          expandedMenus: []
        }
      }));
      if (browser) {
        localStorage.removeItem('expandedMenus');
      }
    }
  };
}

export const layout = createLayoutStore();
