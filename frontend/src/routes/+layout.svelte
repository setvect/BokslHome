<script>
  import '../app.pcss';
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme';

  // 브라우저에서 테마 초기화
  onMount(() => {
    theme.init();
  });
</script>

<slot />