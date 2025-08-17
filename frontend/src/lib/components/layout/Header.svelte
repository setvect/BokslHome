<script lang="ts">
  let props = $props<{
    title?: string;
    actions?: () => unknown;
    onToggleSidebar?: () => void;
    onSetLight?: () => void;
    onSetDark?: () => void;
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
    <button type="button" class="px-3 py-1 rounded border" aria-label="라이트 테마로 변경" onclick={() => props.onSetLight?.()}
      >Light</button
    >
    <button type="button" class="px-3 py-1 rounded border" aria-label="다크 테마로 변경" onclick={() => props.onSetDark?.()}>Dark</button>

    {@render props.actions?.()}
  </div>
</header>
