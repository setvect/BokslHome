<script lang="ts">
  import '../app.pcss';
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import { Menu, User, Sun, Moon } from '@lucide/svelte';

  interface Props {
    children: any;
  }

  let { children }: Props = $props();

  // 사이드바 상태
  let isSidebarOpen = $state(false);

  // 현재 테마 상태
  let currentTheme = $state('light');

  // 브라우저에서 테마 초기화
  onMount(() => {
    theme.init();
    currentTheme = theme.get();
    
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

  // 테마 토글
  function toggleTheme() {
    if (currentTheme === 'light') {
      theme.set('dark');
    } else if (currentTheme === 'dark') {
      theme.set('system');
    } else {
      theme.set('light');
    }
  }
</script>

<!-- 메인 레이아웃: 헤더 + 사이드바 + 콘텐츠 -->
<div class="min-h-screen bg-background">
  <!-- 헤더 영역 -->
  <header class="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40">
    <div class="flex items-center justify-between h-full px-4">
      <!-- 좌측: 메뉴 토글 + 로고 -->
      <div class="flex items-center gap-4">
        <button 
          class="lg:hidden p-2 hover:bg-accent rounded-md transition-colors"
          onclick={toggleSidebar}
          aria-label="메뉴 토글"
        >
          <Menu class="w-5 h-5" />
        </button>
        <h1 class="text-xl font-bold text-foreground">복슬홈</h1>
      </div>
      
      <!-- 우측: 사용자 액션 -->
      <div class="flex items-center gap-2">
        <!-- 테마 토글 버튼 -->
        <button 
          class="p-2 hover:bg-accent rounded-md transition-colors"
          onclick={toggleTheme}
          aria-label="테마 변경"
          title="테마: {currentTheme}"
        >
          {#if currentTheme === 'dark'}
            <Moon class="w-5 h-5" />
          {:else}
            <Sun class="w-5 h-5" />
          {/if}
        </button>
        <!-- 사용자 메뉴 버튼 -->
        <button 
          class="p-2 hover:bg-accent rounded-md transition-colors"
          aria-label="사용자 메뉴"
        >
          <User class="w-5 h-5" />
        </button>
      </div>
    </div>
  </header>

  <!-- 사이드바 -->
  <Sidebar {isSidebarOpen} onClose={closeSidebar} />

  <!-- 메인 콘텐츠 영역 -->
  <main class="flex-1 lg:ml-64 ml-0 pt-16">
    <div class="p-6">
      {@render children()}
    </div>
  </main>
</div>