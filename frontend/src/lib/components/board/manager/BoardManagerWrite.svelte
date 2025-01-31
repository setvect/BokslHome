<script lang="ts">
  import { Label, Input, Radio, Button } from 'flowbite-svelte';
  import { goto } from '$app/navigation';

  interface FormData {
    code: string;
    name: string;
    uploadLimit: string;
    useComment: string;
    useUpload: string;
    useEncrypt: string;
  }

  interface DirtyFields {
    code: boolean;
    name: boolean;
    uploadLimit: boolean;
  }

  interface FormErrors {
    code: string;
    name: string;
    uploadLimit: string;
  }

  let formData: FormData = {
    code: '',
    name: '',
    uploadLimit: '',
    useComment: 'Y',
    useUpload: 'Y',
    useEncrypt: 'N'
  };

  let dirty: DirtyFields = {
    code: false,
    name: false,
    uploadLimit: false
  };

  let errors: FormErrors = {
    code: '',
    name: '',
    uploadLimit: ''
  };

  function validateField(field: keyof DirtyFields, value: string) {
    switch (field) {
      case 'code':
        if (!value) {
          errors.code = '게시판 코드를 입력해주세요';
          return false;
        }
        errors.code = '';
        return true;

      case 'name':
        if (!value) {
          errors.name = '게시판 이름을 입력해주세요';
          return false;
        }
        errors.name = '';
        return true;

      case 'uploadLimit':
        if (!value) {
          errors.uploadLimit = '업로드 용량을 입력해주세요';
          return false;
        }
        errors.uploadLimit = '';
        return true;
    }
  }

  function handleBlur(field: keyof DirtyFields, value: string) {
    dirty[field] = true;
    validateField(field, value);
  }

  function validateForm() {
    let isValid = true;

    (Object.keys(dirty) as Array<keyof DirtyFields>).forEach((field) => {
      dirty[field] = true;
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    return isValid;
  }

  function handleSubmit() {
    if (validateForm()) {
      console.log('폼 데이터:', formData);
    }
  }

  function handleCancel() {
    goto('/board/manager');
  }
</script>

<div class="max-w-3xl">
  <form on:submit|preventDefault={handleSubmit}>
    <!-- 게시판 코드 -->
    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 pb-4">
      <Label for="code" class="w-48 text-gray-700 dark:text-gray-300 font-medium">게시판 코드</Label>
      <div class="flex-1">
        <Input
          id="code"
          type="text"
          bind:value={formData.code}
          on:blur={() => handleBlur('code', formData.code)}
          color={dirty.code && errors.code ? 'red' : 'base'}
        />
        {#if dirty.code && errors.code}
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">{errors.code}</p>
        {/if}
      </div>
    </div>

    <!-- 게시판 이름 -->
    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 py-4">
      <Label for="name" class="w-48 text-gray-700 dark:text-gray-300 font-medium">게시판 이름</Label>
      <div class="flex-1">
        <Input
          id="name"
          type="text"
          bind:value={formData.name}
          on:blur={() => handleBlur('name', formData.name)}
          color={dirty.name && errors.name ? 'red' : 'base'}
        />
        {#if dirty.name && errors.name}
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">{errors.name}</p>
        {/if}
      </div>
    </div>

    <!-- 업로드 용량 제한 -->
    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 py-4">
      <Label for="uploadLimit" class="w-48 text-gray-700 dark:text-gray-300 font-medium">업로드 용량 제한</Label>
      <div class="flex-1">
        <div class="relative">
          <Input
            id="uploadLimit"
            type="number"
            bind:value={formData.uploadLimit}
            on:blur={() => handleBlur('uploadLimit', formData.uploadLimit)}
            color={dirty.uploadLimit && errors.uploadLimit ? 'red' : 'base'}
          >
            <div slot="right" class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span class="text-gray-500">Mbyte</span>
            </div>
          </Input>
        </div>
        {#if dirty.uploadLimit && errors.uploadLimit}
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">{errors.uploadLimit}</p>
        {/if}
      </div>
    </div>

    <!-- 라디오 버튼 그룹 -->
    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 py-4">
      <Label class="w-48 text-gray-700 dark:text-gray-300 font-medium">댓글 사용</Label>
      <div class="flex gap-8">
        <Radio name="useComment" value="Y" bind:group={formData.useComment}>예</Radio>
        <Radio name="useComment" value="N" bind:group={formData.useComment}>아니오</Radio>
      </div>
    </div>

    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 py-4">
      <Label class="w-48 text-gray-700 dark:text-gray-300 font-medium">파일 업로드</Label>
      <div class="flex gap-8">
        <Radio name="useUpload" value="Y" bind:group={formData.useUpload}>예</Radio>
        <Radio name="useUpload" value="N" bind:group={formData.useUpload}>아니오</Radio>
      </div>
    </div>

    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 py-4">
      <Label class="w-48 text-gray-700 dark:text-gray-300 font-medium">암호화 글 등록</Label>
      <div class="flex gap-8">
        <Radio name="useEncrypt" value="Y" bind:group={formData.useEncrypt}>예</Radio>
        <Radio name="useEncrypt" value="N" bind:group={formData.useEncrypt}>아니오</Radio>
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-6">
      <Button on:click={handleSubmit} color="blue">저장</Button>
      <Button on:click={handleCancel} color="light">취소</Button>
    </div>
  </form>
</div>
