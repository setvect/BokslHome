<script lang="ts">
  import { marked } from 'marked';

  export let content = '';
  export let isDarkMode = true;

  let previewHtml = '';

  // 마크다운을 HTML로 변환
  async function updatePreview(markdownText: string) {
    previewHtml = await marked.parse(markdownText);
  }

  // content가 변경될 때마다 미리보기 업데이트
  $: if (content) {
    updatePreview(content);
  }
</script>

<div class="preview-container" class:dark={isDarkMode}>
  {@html previewHtml}
</div>

<style>
  .preview-container {
    flex: 1;
    height: 100%;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    overflow: auto;
    background-color: white;
    color: #1a202c;
  }

  .preview-container.dark {
    background-color: #1a202c;
    color: #e2e8f0;
    border-color: #4a5568;
  }

  /* 마크다운 스타일 */
  .preview-container :global(h1) {
    font-size: 2em;
    margin-bottom: 0.5em;
  }

  .preview-container :global(h2) {
    font-size: 1.5em;
    margin-bottom: 0.5em;
  }

  .preview-container :global(h3) {
    font-size: 1.25em;
    margin-bottom: 0.5em;
  }

  .preview-container :global(p) {
    margin-bottom: 1em;
  }

  .preview-container :global(ul),
  .preview-container :global(ol) {
    margin-bottom: 1em;
    padding-left: 2em;
  }

  .preview-container :global(li) {
    margin-bottom: 0.5em;
  }

  .preview-container :global(code) {
    background-color: #f7fafc;
    padding: 0.2em 0.4em;
    border-radius: 0.25em;
    font-family: monospace;
  }

  .preview-container.dark :global(code) {
    background-color: #2d3748;
  }

  .preview-container :global(pre) {
    background-color: #f7fafc;
    padding: 1em;
    border-radius: 0.375rem;
    overflow-x: auto;
    margin-bottom: 1em;
  }

  .preview-container.dark :global(pre) {
    background-color: #2d3748;
  }

  .preview-container :global(blockquote) {
    border-left: 4px solid #e2e8f0;
    padding-left: 1em;
    margin-left: 0;
    margin-bottom: 1em;
    color: #4a5568;
  }

  .preview-container.dark :global(blockquote) {
    border-left-color: #4a5568;
    color: #a0aec0;
  }

  .preview-container :global(table) {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1em;
  }

  .preview-container :global(th),
  .preview-container :global(td) {
    border: 1px solid #e2e8f0;
    padding: 0.5em;
  }

  .preview-container.dark :global(th),
  .preview-container.dark :global(td) {
    border-color: #4a5568;
  }

  .preview-container :global(th) {
    background-color: #f7fafc;
  }

  .preview-container.dark :global(th) {
    background-color: #2d3748;
  }
</style>
