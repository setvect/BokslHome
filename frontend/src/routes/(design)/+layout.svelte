<script lang="ts">
  import { onMount } from 'svelte';
  import { layout } from '$lib/stores/layout';
  import Header from '$lib/components/layout/Header.svelte';

  // 레이아웃 상태 구독 (테마만 사용)
  let layoutState = $state({ currentTheme: 'dark', mounted: false });

  onMount(() => {
    layout.init();
    
    const unsubscribe = layout.subscribe((state) => {
      layoutState = { 
        currentTheme: state.currentTheme, 
        mounted: state.mounted 
      };
    });
    
    return unsubscribe;
  });
</script>

<!-- 디자인 시스템 레이아웃: 헤더만 공유, 사이드바는 디자인 시스템 전용 -->
<div class="min-h-screen bg-background">
  <!-- 앱 헤더 (테마 토글 포함) -->
  <Header 
    currentTheme={layoutState.currentTheme}
    mounted={layoutState.mounted}
    onToggleTheme={layout.toggleTheme}
    onToggleSidebar={() => {}} 
    isSidebarOpen={false}
  />

  <!-- 디자인 시스템 콘텐츠 (자체 사이드바 포함) -->
  <div class="pt-16">
    <slot />
  </div>
</div>