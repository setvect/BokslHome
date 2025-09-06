<script lang="ts">
  import type { RenderFn } from '$lib/types/common';
  import { Sun, Moon } from '@lucide/svelte';
  
  let props = $props<{
    title?: string;
    actions?: RenderFn;
    onToggleSidebar?: () => void;
    onToggleTheme?: () => void;
    isDarkMode?: boolean;
  }>();
  // actions: 이름 있는 슬롯 대체 렌더 함수
</script>

<header class="h-14 flex items-center px-4 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
  <!-- 모바일 사이드바 토글 버튼 -->
  <button type="button" class="mr-3 px-3 py-1 rounded border" aria-label="사이드바 토글" onclick={() => props.onToggleSidebar?.()}>
    ☰
  </button>

  <!-- 헤더에서는 로고 텍스트 제거 (사이드바에만 표기) -->
  <div class="text-lg font-semibold" aria-hidden="true"></div>
  <div class="ml-auto flex items-center gap-2">
    <!-- 테마 토글 버튼 -->
    <button 
      type="button" 
      class="flex items-center gap-2 px-3 py-1 rounded border hover:bg-accent hover:text-accent-foreground transition-colors" 
      aria-label={props.isDarkMode ? "라이트 모드로 변경" : "다크 모드로 변경"} 
      onclick={() => props.onToggleTheme?.()}
    >
      {#if props.isDarkMode}
        <Sun class="w-4 h-4" />
        <span>Light</span>
      {:else}
        <Moon class="w-4 h-4" />
        <span>Dark</span>
      {/if}
    </button>

    {@render props.actions?.()}
  </div>
</header>
