<script lang="ts">
  import { Label, Input, Radio, Button } from 'flowbite-svelte';
  import { goto } from '$app/navigation';
  import { z } from 'zod';
  import { useForm } from '$lib/utils/formUtils';

  type FormData = {
    code: string;
    name: string;
    uploadLimit: number;
    useComment: string;
    useUpload: string;
    useEncrypt: string;
  };

  const formSchema = z.object({
    code: z.string().min(1, '게시판 코드를 입력해주세요'),
    name: z.string().min(1, '게시판 이름을 입력해주세요'),
    uploadLimit: z
      .number({
        required_error: '업로드 용량을 입력해주세요',
        invalid_type_error: '숫자를 입력해주세요'
      })
      .min(0, '0 이상의 숫자를 입력해주세요')
      .max(100, '100 이하의 숫자를 입력해주세요'),
    useComment: z.string(),
    useUpload: z.string(),
    useEncrypt: z.string()
  });

  const initialValues: FormData = {
    code: '',
    name: '',
    uploadLimit: 0,
    useComment: 'Y',
    useUpload: 'Y',
    useEncrypt: 'N'
  };

  function handleSubmit(values: FormData) {
    console.log('Valid:', values);
  }

  const { form, errors, touched } = useForm(formSchema, initialValues, handleSubmit);

  function handleCancel() {
    goto('/board/manager');
  }
</script>

<div class="max-w-3xl">
  <form use:form>
    <!-- 게시판 코드 -->
    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 pb-4">
      <Label for="code" class="w-48 text-gray-700 dark:text-gray-300 font-medium">게시판 코드</Label>
      <div class="flex-1">
        <Input id="code" name="code" type="text" color={$touched.code && $errors.code ? 'red' : 'base'} />
        {#if $touched.code && $errors.code}
          <p class="mt-2 text-sm text-red-600 dark:text-red-300">{$errors.code}</p>
        {/if}
      </div>
    </div>

    <!-- 게시판 이름 -->
    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 py-4">
      <Label for="name" class="w-48 text-gray-700 dark:text-gray-300 font-medium">게시판 이름</Label>
      <div class="flex-1">
        <Input id="name" name="name" type="text" color={$touched.name && $errors.name ? 'red' : 'base'} />
        {#if $touched.name && $errors.name}
          <p class="mt-2 text-sm text-red-600 dark:text-red-300">{$errors.name}</p>
        {/if}
      </div>
    </div>

    <!-- 업로드 용량 제한 -->
    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 py-4">
      <Label for="uploadLimit" class="w-48 text-gray-700 dark:text-gray-300 font-medium">업로드 용량 제한</Label>
      <div class="flex-1">
        <div class="relative">
          <Input id="uploadLimit" name="uploadLimit" type="number" color={$touched.uploadLimit && $errors.uploadLimit ? 'red' : 'base'}>
            <div slot="right" class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span class="text-gray-500">Mbyte</span>
            </div>
          </Input>
        </div>
        {#if $touched.uploadLimit && $errors.uploadLimit}
          <p class="mt-2 text-sm text-red-600 dark:text-red-300">{$errors.uploadLimit}</p>
        {/if}
      </div>
    </div>

    <!-- 라디오 버튼 그룹 -->
    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 py-4">
      <Label class="w-48 text-gray-700 dark:text-gray-300 font-medium">댓글 사용</Label>
      <div class="flex gap-8">
        <Radio name="useComment" value="Y">예</Radio>
        <Radio name="useComment" value="N">아니오</Radio>
      </div>
    </div>

    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 py-4">
      <Label class="w-48 text-gray-700 dark:text-gray-300 font-medium">파일 업로드</Label>
      <div class="flex gap-8">
        <Radio name="useUpload" value="Y">예</Radio>
        <Radio name="useUpload" value="N">아니오</Radio>
      </div>
    </div>

    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 py-4">
      <Label class="w-48 text-gray-700 dark:text-gray-300 font-medium">암호화 글 등록</Label>
      <div class="flex gap-8">
        <Radio name="useEncrypt" value="Y">예</Radio>
        <Radio name="useEncrypt" value="N">아니오</Radio>
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-6">
      <Button type="submit">저장</Button>
      <Button on:click={handleCancel} color="light">취소</Button>
    </div>
  </form>
</div>
