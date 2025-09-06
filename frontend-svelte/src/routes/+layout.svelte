<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import '../app.css';
  // 전역 레이아웃에서는 그룹 레이아웃이 렌더링됨
  let { children } = $props();
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
