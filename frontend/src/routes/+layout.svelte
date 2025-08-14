<script lang="ts">
  import '../app.pcss';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { layout } from '$lib/stores/layout';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import MainContent from '$lib/components/layout/MainContent.svelte';

  interface Props {
    children: any;
  }

  let { children }: Props = $props();

  // 레이아웃 상태 구독
  let layoutState = $state({ isSidebarOpen: false, currentTheme: 'dark', mounted: false });

  // 로그인 페이지 여부 확인
  const isAuthPage = $derived($page.url.pathname.startsWith('/login'));

  onMount(() => {
    layout.init();
    
    const unsubscribe = layout.subscribe((state) => {
      layoutState = state;
    });
    
    return unsubscribe;
  });
</script>

{#if isAuthPage}
  <!-- 로그인/인증 페이지: 레이아웃 없이 순수 페이지만 -->
  {@render children()}
{:else}
  <!-- 메인 레이아웃: 헤더 + 사이드바 + 콘텐츠 -->
  <div class="min-h-screen bg-background">
    <!-- 헤더 -->
    <Header 
      currentTheme={layoutState.currentTheme}
      mounted={layoutState.mounted}
      onToggleTheme={layout.toggleTheme}
      onToggleSidebar={layout.toggleSidebar}
      isSidebarOpen={layoutState.isSidebarOpen}
    />

    <!-- 사이드바 -->
    <Sidebar 
      isSidebarOpen={layoutState.isSidebarOpen} 
      onClose={layout.closeSidebar}
    />

    <!-- 메인 콘텐츠 영역 -->
    <MainContent {children} />
  </div>
{/if}