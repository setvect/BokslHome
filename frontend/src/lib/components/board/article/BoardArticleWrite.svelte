<script lang="ts">
  import { Label, Input, Radio, Button } from 'flowbite-svelte';
  import { goto } from '$app/navigation';
  import { z } from 'zod';
  import { useForm } from '$lib/utils/formUtils';
  import SvelteQuill from 'svelte-quill';

  type FormData = {
    title: string;
    content: string;
  };

  const formSchema = z.object({
    title: z.string().min(1, '제목을 입력해주세요.'),
    content: z.string().min(1, '내용을 입력하세요.')
  });

  const initialValues: FormData = {
    title: '',
    content: ''
  };

  const handleSubmit = (values: FormData) => {
    console.log('Valid:', values);
  };

  const { form, errors, touched } = useForm(formSchema, initialValues, handleSubmit);

  // SvelteQuill 에디터의 값을 별도의 변수로 관리
  let contentValue = initialValues.content;

  const handleCancel = () => {
    goto('/board/manager');
  };
</script>

<div>
  <form use:form>
    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 pb-4">
      <div class="flex-1">
        <Input id="code" name="title" type="text" color={$touched.title && $errors.title ? 'red' : 'base'} />
        {#if $touched.title && $errors.title}
          <p class="error-text">{$errors.title}</p>
        {/if}
      </div>
    </div>

    <!-- 기존 content 영역을 Quill 에디터로 대체 -->
    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 py-4">
      <div class="flex-1">
        <SvelteQuill bind:value={contentValue} />
        <!-- hidden input에 바인딩하여 useForm이 값을 읽도록 함 -->
        <input type="hidden" bind:value={contentValue} name="content" />
        {#if $touched.content && $errors.content}
          <p class="error-text">{$errors.content}</p>
        {/if}
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-6">
      <Button type="submit">저장</Button>
      <Button on:click={handleCancel} color="light">취소</Button>
    </div>
  </form>
</div>
