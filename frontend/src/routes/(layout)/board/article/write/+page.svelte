<script lang="ts">
  import BoardArticleWrite from '$lib/components/board/article/BoardArticleWrite.svelte';
  import { Heading } from 'flowbite-svelte';
</script>

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
  <div class="pt-4 px-4">
    <Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">게시물 작성</Heading>
  </div>
  <div class="px-4 mt-5"><BoardArticleWrite /></div>
</main>
