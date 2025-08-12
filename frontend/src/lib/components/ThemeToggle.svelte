<script lang="ts">
  import { theme } from '$lib/stores/theme';
  
  $: currentTheme = $theme;
  
  // 현재 테마에 따른 아이콘 결정
  $: themeIcon = currentTheme === 'dark' ? '☀️' : '🌙';
  $: themeLabel = currentTheme === 'dark' ? '라이트 모드' : '다크 모드';
</script>

<!-- 깔끔한 테마 토글 버튼 -->
<button
  class="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-accent transition-colors"
  on:click={theme.toggleTheme}
  type="button"
  title={themeLabel}
>
  <span class="text-lg">{themeIcon}</span>
</button>