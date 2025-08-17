<script lang="ts">
  let { children } = $props();
</script>

<main class="min-h-dvh lg:ml-64 pt-14 p-4">
  {@render children?.()}
</main>
