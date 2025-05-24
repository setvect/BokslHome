<svelte:options runes={true} />

<script lang="ts">
  import MarkdownEditor, { type MarkdownEditorMethods } from '$lib/components/markdown/MarkdownEditor.svelte';
  import { isDarkMode } from '$lib/stores/themeStore';

  let content = $state('# hello\n- ㅋㅋㅋ\n- ㄲㄲㄲ\n\n```sql\nSELECT * FROM users;\n```');
  let markdownEditor = $state<MarkdownEditorMethods>();

  function handleContentChange(newContent: string) {
    console.log('에디터 내용 변경:', newContent);
  }

  function handleGetContent() {
    if (markdownEditor) {
      const currentContent = markdownEditor.getContent();
      console.log('현재 에디터 내용:', currentContent);
    }
  }
</script>

<div class="container">
  <h1>마크다운 에디터 테스트</h1>

  <div class="controls">
    <button onclick={handleGetContent} class="get-content-btn"> 내용 가져오기 </button>
  </div>

  <MarkdownEditor bind:this={markdownEditor} bind:value={content} isDarkMode={$isDarkMode} onchange={handleContentChange} height="500px" />
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .controls {
    margin-bottom: 1rem;
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .get-content-btn {
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  .get-content-btn:hover {
    background-color: #45a049;
  }
</style>
