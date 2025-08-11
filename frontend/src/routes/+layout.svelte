<script>
  import "../app.css";
  import { theme } from "$lib/stores/theme";
  import { onMount } from "svelte";

  // SvelteKit에서 자동으로 전달하는 모든 props를 무시
  $: void $$restProps;

  onMount(() => {
    theme.init();
  });
</script>

<slot />
