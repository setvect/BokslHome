<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  
  // 초기값을 DOM 상태에서 결정
  let currentTheme = browser && document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  
  onMount(() => {
    // 실제 저장된 테마 값으로 동기화
    if (browser) {
      const storedTheme = localStorage.getItem('theme') || 'system';
      const isDark = document.documentElement.classList.contains('dark');
      
      if (storedTheme === 'system') {
        currentTheme = 'system';
      } else {
        currentTheme = isDark ? 'dark' : 'light';
      }
      
      // 스토어 초기화
      theme.init();
    }
    
    // 스토어 구독
    const unsubscribe = theme.subscribe(value => {
      currentTheme = value;
    });
    
    return unsubscribe;
  });
  
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