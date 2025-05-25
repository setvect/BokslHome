<svelte:options runes={true} />

<script lang="ts">
  import { goto } from '$app/navigation';
  import QuillEditor, { type QuillEditorMethods } from '$lib/components/QuillEditor.svelte';
  import { useForm } from '$lib/utils/formUtils';
  import { Button, Input } from 'flowbite-svelte';
  import 'quill/dist/quill.snow.css';
  import { z } from 'zod';
  import { isDarkMode } from '$lib/stores/themeStore';

  type FormData = {
    title: string;
    content: string;
  };

  let quillEditor = $state<QuillEditorMethods>();
  let editorContent = $state(''); // 에디터 내용을 위한 상태 변수

  const formSchema = z.object({
    title: z.string().trim().min(1, '제목을 입력해주세요.'),
    content: z.string().refine(
      (value) => {
        const strippedValue = value.replace(/<[^>]*>/g, '').trim();
        const hasImage = /<img[^>]*>/.test(value);
        return strippedValue.length > 0 || hasImage;
      },
      { message: '내용을 입력하세요.' }
    )
  });

  const initialValues: FormData = {
    title: '',
    content: ''
  };

  const handleSubmit = (values: FormData) => {
    console.log('Title:', values.title);
    console.log('Content:', values.content);
  };

  const { form, errors, touched, setFieldValue } = useForm(formSchema, initialValues, handleSubmit);

  // 에디터 내용이 변경될 때마다 폼 값 업데이트
  $effect(() => {
    setFieldValue('content', editorContent);
  });

  const handleCancel = () => {
    goto('/board/article');
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

    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 py-4">
      <div class="flex-1">
        <QuillEditor bind:this={quillEditor} bind:content={editorContent} height="50vh" darkMode={$isDarkMode} />
        {#if $touched.content && $errors.content}
          <p class="error-text">{$errors.content}</p>
        {/if}
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-6">
      <Button type="submit" color="green">저장</Button>
      <Button onclick={handleCancel} color="light">취소</Button>
    </div>
  </form>
</div>
