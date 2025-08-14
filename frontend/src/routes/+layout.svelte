<script lang="ts">
  import '../app.pcss';
  import { onMount } from 'svelte';
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

  onMount(() => {
    layout.init();
    
    const unsubscribe = layout.subscribe((state) => {
      layoutState = state;
    });
    
    return unsubscribe;
  });
</script>

<!-- 메인 레이아웃: 헤더 + 사이드바 + 콘텐츠 -->
<div class="min-h-screen bg-background">
  <!-- 헤더 -->
  <Header 
    currentTheme={layoutState.currentTheme}
    mounted={layoutState.mounted}
    onToggleSidebar={layout.toggleSidebar}
    onToggleTheme={layout.toggleTheme}
  />

  <!-- 사이드바 -->
  <Sidebar 
    isSidebarOpen={layoutState.isSidebarOpen} 
    onClose={layout.closeSidebar} 
  />

  <!-- 메인 콘텐츠 영역 -->
  <MainContent {children} />
</div>