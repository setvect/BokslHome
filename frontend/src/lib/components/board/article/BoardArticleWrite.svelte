<script lang="ts">
  import { goto } from '$app/navigation';
  import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';
  import QuillEditor from '$lib/components/QuillEditor.svelte';
  import ToastEditor from '$lib/components/ToastEditor.svelte';
  import { useForm } from '$lib/utils/formUtils';
  import { Button, Input } from 'flowbite-svelte';
  import 'quill/dist/quill.snow.css';
  import { z } from 'zod';

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
    console.log('Title:', values.title);
    console.log('Content:', values.content);
  };

  const { form, errors, touched, setFieldValue } = useForm(formSchema, initialValues, handleSubmit);

  const handleEditorChange = (event: CustomEvent<string>) => {
    const content = event.detail;
    setFieldValue('content', content);
  };

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
        <MarkdownEditor />
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-6">
      <Button type="submit" color="green">저장</Button>
      <Button on:click={handleCancel} color="light">취소</Button>
    </div>
  </form>
</div>
