<script lang="ts">
  import BoardManageList from '$lib/components/board/manager/BoardManagerList.svelte';
  import { Heading } from 'flowbite-svelte';
  import MetaTag from '../../utils/MetaTag.svelte';
</script>

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
  <div class="pt-4 px-4">
    <Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">게시판 관리</Heading>
  </div>
  <div class="px-4 mb-4"><BoardManageList /></div>
</main>
