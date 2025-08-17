<script lang="ts">
  let { children } = $props();
</script>

<svelte:head>
  <title>BokslHome - Home</title>
  <meta name="description" content="복슬홈 메인 페이지" />
</svelte:head>

<section>
  <h1 class="text-xl font-semibold">Home</h1>
  <p class="text-muted-foreground mt-2">복슬홈 메인 페이지입니다.</p>
  {@render children?.()}
</section>
