<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import '../app.css';

  let { children } = $props();

  // 라이트/다크 테마만 지원
  let theme: 'light' | 'dark' = $state('light');

  // 초기 로드: 로컬 스토리지에서 테마 읽기
  $effect(() => {
    if (typeof localStorage === 'undefined') return;
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  });

  // HTML 루트에 다크 모드 클래스 적용
  $effect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
  });

  function setLight() {
    theme = 'light';
    if (typeof localStorage !== 'undefined') localStorage.setItem('theme', 'light');
  }
  function setDark() {
    theme = 'dark';
    if (typeof localStorage !== 'undefined') localStorage.setItem('theme', 'dark');
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>BokslHome</title>
</svelte:head>

<div class="min-h-dvh">
  <header class="p-4 flex gap-2 justify-end">
    <button class="px-3 py-1 rounded border" onclick={setLight}>Light</button>
    <button class="px-3 py-1 rounded border" onclick={setDark}>Dark</button>
  </header>
  {@render children?.()}
</div>
