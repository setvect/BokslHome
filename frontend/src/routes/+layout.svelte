<script lang="ts">
  import '../app.pcss';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { theme } from '$lib/stores/theme';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import MainContent from '$lib/components/layout/MainContent.svelte';

  interface Props {
    children: any;
  }

  let { children }: Props = $props();

  // 사이드바 상태
  let isSidebarOpen = $state(false);

  // 현재 테마 상태 - hydration 문제 해결을 위해 클라이언트에서만 초기화
  let currentTheme = $state('dark');
  let mounted = $state(false);

  // 브라우저에서 테마 초기화
  onMount(() => {
    // 테마 초기화 및 실제 테마 값 가져오기
    theme.init();
    currentTheme = theme.get();
    mounted = true;
    
    // 테마 변경 구독
    const unsubscribe = theme.subscribe((newTheme) => {
      currentTheme = newTheme;
    });
    
    return unsubscribe;
  });

  // 사이드바 토글
  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  // 사이드바 닫기
  function closeSidebar() {
    isSidebarOpen = false;
  }

  // 테마 토글 - 단순하게 light ↔ dark만 전환
  function toggleTheme() {
    if (!browser) return;
    
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    theme.set(newTheme);
  }
</script>

<!-- 메인 레이아웃: 헤더 + 사이드바 + 콘텐츠 -->
<div class="min-h-screen bg-background">
  <!-- 헤더 -->
  <Header 
    {currentTheme}
    onToggleSidebar={toggleSidebar}
    onToggleTheme={toggleTheme}
  />

  <!-- 사이드바 -->
  <Sidebar {isSidebarOpen} onClose={closeSidebar} />

  <!-- 메인 콘텐츠 영역 -->
  <MainContent {children} />
</div>