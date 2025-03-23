<script lang="ts">
  import BoardManagerEdit from '$lib/components/board/manager/BoardManagerEdit.svelte';
  import { Heading, Label, Input, Radio, Button } from 'flowbite-svelte';

  let formData = {
    code: '',
    name: '',
    uploadLimit: '',
    useComment: 'Y',
    useUpload: 'Y',
    useEncrypt: 'N'
  };

  function handleSubmit() {
    console.log('폼 데이터:', formData);
  }
</script>

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
  <div class="pt-4 px-4">
    <Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">게시판 수정</Heading>
  </div>
  <div class="px-4 mt-5"><BoardManagerEdit /></div>
</main>
