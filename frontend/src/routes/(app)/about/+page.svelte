<script lang="ts">
  let { children } = $props();
</script>

<svelte:head>
  <title>BokslHome - About</title>
  <meta name="description" content="복슬홈 프로젝트 소개 페이지" />
</svelte:head>

<section>
  <h1 class="text-xl font-semibold">About</h1>
  <p class="text-muted-foreground mt-2">프로젝트 소개(테스트용) 페이지입니다.</p>
  {@render children?.()}
</section>
