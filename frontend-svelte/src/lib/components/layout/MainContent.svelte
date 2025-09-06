<script lang="ts">
  let { children } = $props();
</script>

<main class="flex-1 p-4 overflow-auto">
  {@render children?.()}
</main>
