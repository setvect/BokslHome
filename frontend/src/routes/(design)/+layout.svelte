<script lang="ts">
  import Header from '$lib/components/layout/Header.svelte';
  import DesignSystemSidebar from '$lib/components/layout/DesignSystemSidebar.svelte';
  import MainContent from '$lib/components/layout/MainContent.svelte';
  import {
    applyThemeToDocument,
    readTheme,
    saveTheme,
    readDesktopSidebarPref,
    saveDesktopSidebarPref,
    matchDesktop,
    onDesktopChange
  } from '$lib/stores/layout';
  import type { ThemeType } from '$lib/types/theme';
  import { THEME } from '$lib/types/theme';

  let { children } = $props();

  // 테마 (라이트/다크)
  let theme: ThemeType = $state(THEME.LIGHT);
  $effect(() => {
    const saved = readTheme();
    if (saved) theme = saved;
  });
  $effect(() => {
    applyThemeToDocument(theme);
  });
  function setLight() {
    theme = THEME.LIGHT;
    saveTheme(THEME.LIGHT);
  }
  function setDark() {
    theme = THEME.DARK;
    saveTheme(THEME.DARK);
  }

  // 사이드바 상태 (모바일 기본 닫힘, 데스크톱 기본 열림) + 데스크톱 지속성
  let sidebarOpen = $state(false);
  let sidebarPrefReady = $state(false);
  $effect(() => {
    const sync = (isDesktop: boolean) => {
      if (isDesktop) {
        const saved = readDesktopSidebarPref();
        sidebarOpen = saved == null ? true : saved;
      } else {
        sidebarOpen = false;
      }
    };
    sync(matchDesktop());
    sidebarPrefReady = true;
    return onDesktopChange((isDesktop) => {
      sync(isDesktop);
      sidebarPrefReady = true;
    });
  });
  // 문서 클래스와 동기화하여 초기/토글 시 플래시 방지 (초기 프리셋이 적용될 때까지는 건드리지 않음)
  $effect(() => {
    if (typeof document === 'undefined') return;
    if (!matchDesktop()) {
      document.documentElement.classList.remove('sidebar-closed');
      return;
    }
    if (!sidebarPrefReady) return;
    const closed = !sidebarOpen;
    document.documentElement.classList.toggle('sidebar-closed', closed);
  });
  function persistIfDesktop(next: boolean) {
    if (matchDesktop()) saveDesktopSidebarPref(next);
  }
  function toggleSidebar() {
    const next = !sidebarOpen;
    sidebarOpen = next;
    persistIfDesktop(next);
  }
  function closeSidebar() {
    sidebarOpen = false;
  }
</script>

{#if sidebarOpen}
  <button
    type="button"
    aria-label="오버레이 닫기"
    class="fixed inset-0 z-40 bg-black/40 lg:hidden"
    onclick={closeSidebar}
    onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && closeSidebar()}
  ></button>
{/if}

<div class="flex min-h-dvh">
  <!-- 좌측 사이드바 (디자인 시스템) -->
  <aside
    class={`app-sidebar ${sidebarOpen ? 'block' : 'hidden'} fixed z-50 top-0 left-0 h-dvh w-64 border-r bg-background lg:static lg:z-auto lg:h-auto lg:block`}
  >
    <DesignSystemSidebar onNavigate={() => !matchDesktop() && closeSidebar()} />
  </aside>
  <!-- 우측 헤더 + 메인 -->
  <div class="flex-1 flex flex-col">
    <Header onToggleSidebar={toggleSidebar} onSetLight={setLight} onSetDark={setDark} />
    <MainContent>
      {@render children?.()}
    </MainContent>
  </div>
</div>
