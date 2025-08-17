<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import '../app.css';
  // 전역 레이아웃에서는 그룹 레이아웃이 렌더링됨

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

  // 사이드바/헤더는 (app) 그룹 레이아웃에서 관리
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>BokslHome</title>
  <script>
    (function () {
      try {
        var t = localStorage.getItem('theme');
        if (t === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (t === 'light') {
          document.documentElement.classList.remove('dark');
        }
        try {
          var mq = window.matchMedia('(min-width: 1024px)').matches;
          if (mq) {
            var v = localStorage.getItem('layout:sidebar-open:desktop');
            if (v === '0') document.documentElement.classList.add('sidebar-closed');
          }
        } catch (e2) {}
      } catch (e) {}
    })();
  </script>
</svelte:head>

<div class="min-h-dvh">
  {@render children?.()}
</div>
