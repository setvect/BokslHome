<script lang="ts">
  import { marked } from 'marked';
  
  export let value: string = '';
  export let darkMode: boolean = false;
  
  let previewHtml: string;
  
  $: previewHtml = marked(value) as string;
</script>

<div class="editor-container">
  <div class="editor">
    <textarea
      bind:value
      class="markdown-input"
      class:dark-mode={darkMode}
      placeholder="마크다운을 입력하세요..."
    ></textarea>
  </div>
  
  <div class="preview">
    <div class="markdown-preview" class:dark-mode={darkMode}>
      {@html previewHtml}
    </div>
  </div>
</div>

<style>
  .editor-container {
    display: flex;
    gap: 1rem;
  }
  
  .editor, .preview {
    flex: 1;
  }
  
  .markdown-input {
    width: 100%;
    min-height: 300px;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: monospace;
    resize: vertical;
  }
  
  .markdown-preview {
    width: 100%;
    min-height: 300px;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow-y: auto;
  }
  
  .dark-mode {
    background-color: #1a1a1a;
    color: #ffffff;
  }
</style>