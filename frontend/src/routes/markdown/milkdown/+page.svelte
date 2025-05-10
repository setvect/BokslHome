<script lang="ts">
  import MarkdownEditor from '$lib/components/editor/MarkdownEditor.svelte';

  let content = '# Hello, Milkdown!\n\n이것은 마크다운 에디터 테스트입니다.';

  function handleChange(newValue: string) {
    content = newValue;
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4 bg-red-500 text-white p-2 rounded">Milkdown 에디터 테스트</h1>

  <div class="h-[calc(100vh-8rem)]">
    <MarkdownEditor initialValue={content} onChange={handleChange} theme="light" height="100%" width="100%" showPreview={true} />
  </div>
</div>
