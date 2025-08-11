<script lang="ts">
  import { theme } from '$lib/stores/theme';
  
  // 테마 옵션
  const themeOptions = [
    { value: 'light', label: '☀️ 라이트', icon: '☀️' },
    { value: 'dark', label: '🌙 다크', icon: '🌙' },
    { value: 'system', label: '💻 시스템', icon: '💻' }
  ] as const;

  $: currentTheme = $theme;
</script>

<!-- 간단한 토글 버튼 -->
<div class="flex items-center gap-2">
  <span class="text-sm font-medium text-foreground">테마:</span>
  
  <div class="flex rounded-lg bg-muted p-1">
    {#each themeOptions as option}
      <button
        class="px-3 py-1 text-xs rounded-md transition-colors"
        class:bg-background={currentTheme === option.value}
        class:text-foreground={currentTheme === option.value}
        class:text-muted-foreground={currentTheme !== option.value}
        class:shadow-sm={currentTheme === option.value}
        on:click={() => theme.setTheme(option.value)}
        type="button"
      >
        {option.label}
      </button>
    {/each}
  </div>
</div>

<!-- 큰 토글 버튼 -->
<div class="flex flex-col gap-2">
  <span class="text-sm font-medium text-foreground">테마 전환:</span>
  
  <button
    class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
    on:click={theme.toggleTheme}
    type="button"
  >
    {currentTheme === 'dark' ? '☀️ 라이트 모드' : '🌙 다크 모드'}
  </button>
  
  <p class="text-xs text-muted-foreground">
    현재: {themeOptions.find(opt => opt.value === currentTheme)?.label}
  </p>
</div>