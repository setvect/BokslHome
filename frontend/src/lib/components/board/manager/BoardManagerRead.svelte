<script lang="ts">
  import { Label, Button } from 'flowbite-svelte';
  import { goto } from '$app/navigation';

  export let boardData = {
    code: 'NOTICE',
    name: '공지사항',
    uploadLimit: '10',
    useComment: 'Y',
    useUpload: 'Y',
    useEncrypt: 'N'
  };

  const getYesNo = (value: string) => (value === 'Y' ? '예' : '아니오');

  const handleList = () => {
    goto('/board/manager');
  };

  const handleModify = () => {
    // 수정 페이지로 이동
    goto('/board/manager/edit');
  };

  const handleDelete = () => {
    // 삭제 처리
    if (confirm('정말 삭제하시겠습니까?')) {
      // 삭제 로직
    }
  };
</script>

<div class="max-w-3xl mt-5">
  <div class="space-y-2">
    {#each Object.entries(boardData) as [key, value], index}
      <div class="flex items-center {index === 0 ? 'pb-4' : 'py-4'} border-b border-gray-200 dark:border-gray-700">
        <Label class="w-48 text-gray-700 dark:text-gray-300 font-medium">
          {#if key === 'code'}
            게시판 코드
          {:else if key === 'name'}
            게시판 이름
          {:else if key === 'uploadLimit'}
            업로드 용량 제한
          {:else if key === 'useComment'}
            댓글 사용
          {:else if key === 'useUpload'}
            파일 업로드
          {:else if key === 'useEncrypt'}
            암호화 글 등록
          {/if}
        </Label>
        <div class="flex-1">
          <span class="text-gray-900 dark:text-white">
            {#if ['useComment', 'useUpload', 'useEncrypt'].includes(key)}
              {getYesNo(value)}
            {:else if key === 'uploadLimit'}
              {value} Mbyte
            {:else}
              {value}
            {/if}
          </span>
        </div>
      </div>
    {/each}
  </div>

  <div class="flex justify-end gap-2 mt-6">
    <Button color="light" on:click={handleList}>목록</Button>
    <Button color="red" on:click={handleDelete}>삭제</Button>
    <Button color="blue" on:click={handleModify}>수정</Button>
  </div>
</div>
