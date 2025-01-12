<script lang="ts">
  import { Label, Input, Radio, Button } from 'flowbite-svelte';

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

<div class="max-w-3xl">
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <!-- 게시판 코드 -->
      <div class="flex items-center border-b border-gray-200 dark:border-gray-700 pb-4">
        <Label for="code" class="w-48 text-gray-700 dark:text-gray-300 font-medium">게시판 코드</Label>
        <Input id="code" type="text" bind:value={formData.code} required class="flex-1" />
      </div>

      <!-- 게시판 이름 -->
      <div class="flex items-center border-b border-gray-200 dark:border-gray-700 py-4">
        <Label for="name" class="w-48 text-gray-700 dark:text-gray-300 font-medium">게시판 이름</Label>
        <Input id="name" type="text" bind:value={formData.name} required class="flex-1" />
      </div>

      <!-- 업로드 용량 제한 -->
      <div class="flex items-center border-b border-gray-200 dark:border-gray-700 py-4">
        <Label for="uploadLimit" class="w-48 text-gray-700 dark:text-gray-300 font-medium">업로드 용량 제한</Label>
        <div class="relative flex-1">
          <Input id="uploadLimit" type="number" bind:value={formData.uploadLimit} required>
            <div slot="right" class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span class="text-gray-500">Mbyte</span>
            </div>
          </Input>
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
    </div>

    <div class="flex justify-end gap-2 mt-6">
      <Button type="submit" color="blue">저장</Button>
      <Button color="light">취소</Button>
    </div>
  </form>
</div>
