<script>
  import "../app.css";
  import { theme } from "$lib/stores/theme";
  import { onMount } from "svelte";

  onMount(() => {
    theme.init();
  });
</script>

<slot />
